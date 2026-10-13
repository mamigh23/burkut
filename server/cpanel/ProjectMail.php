<?php
declare(strict_types=1);
namespace Burkut;

use PHPMailer\PHPMailer\PHPMailer;
use RuntimeException;
use Throwable;

function parseProject(mixed $input): array {
    if (!is_object($input)) return [null, ['detail' => 'Geçerli bir proje özeti gerekli.']];
    $limits = ['name'=>120, 'email'=>254, 'phone'=>120, 'company'=>120, 'detail'=>4000, 'budget'=>120];
    $data = []; $errors = [];
    foreach ($limits as $field => $limit) {
        $value = $input->$field ?? null;
        if ($value === null && in_array($field, ['phone','company','budget'], true)) $value = '';
        if (!is_string($value)) {
            $errors[$field] = 'Geçerli bir metin yazmalısın.';
            $value = '';
        }
        // Match JS UTF-16 length, including astral characters.
        if (strlen(mb_convert_encoding($value, 'UTF-16LE', 'UTF-8')) / 2 > $limit)
            $errors[$field] = "En fazla $limit karakter yazabilirsin.";
        if (str_contains($value, "\0") || ($field !== 'detail' && preg_match('/[\r\n]/', $value)))
            $errors[$field] = 'Bu alan tek satır olmalı.';
        $data[$field] = trim($value);
    }
    if ($data['name'] === '' && !isset($errors['name'])) $errors['name'] = 'Adını ve soyadını yazmalısın.';
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Geçerli bir e-posta adresi yazmalısın.';
    if ($data['detail'] === '' && !isset($errors['detail'])) $errors['detail'] = 'Fikrini birkaç cümleyle anlatmalısın.';
    $areas = $input->areas ?? null;
    if (!is_array($areas) || count($areas) < 1 || count($areas) > 4 ||
        count(array_filter($areas, fn($v) => !is_string($v) || !in_array($v, ['web','app','game','other'], true))))
        $errors['areas'] = 'En az bir geçerli proje alanı seçmelisin.';
    else $data['areas'] = array_values(array_unique($areas));
    return [$errors ? null : $data, $errors];
}

// Local filesystem lock coordinates PHP workers on one hosting filesystem.
// Corrupt/unwritable state fails closed; it must never silently resend mail.
function withState(array $config, callable $change): mixed {
    $dir = $config['state_dir'];
    if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) throw new RuntimeException('State unavailable');
    $file = fopen($dir . '/delivery.json', 'c+');
    if (!$file) throw new RuntimeException('State unavailable');
    try {
        chmod($dir . '/delivery.json', 0600);
        if (!flock($file, LOCK_EX | LOCK_NB)) throw new RuntimeException('State busy');
        $raw = stream_get_contents($file, 1024 * 1024 + 1);
        if ($raw === false || strlen($raw) > 1024 * 1024) throw new RuntimeException('State invalid');
        $state = $raw === '' ? ['rates'=>[], 'requests'=>[], 'day'=>'', 'daily'=>0] : json_decode($raw, true, 64, JSON_THROW_ON_ERROR);
        if (!is_array($state) || !is_array($state['rates'] ?? null) || !is_array($state['requests'] ?? null)) throw new RuntimeException('State invalid');
        $result = $change($state);
        $json = json_encode($state, JSON_THROW_ON_ERROR);
        rewind($file);
        if (!ftruncate($file, 0) || fwrite($file, $json) !== strlen($json) || !fflush($file)) throw new RuntimeException('State write failed');
        return $result;
    } finally { flock($file, LOCK_UN); fclose($file); }
}

function handleProject(string $method, array $headers, string $body, string $client, array $config, callable $deliver, ?int $now = null): array {
    $now ??= time();
    if ($method !== 'POST') return [405, ['code'=>'METHOD_NOT_ALLOWED'], ['Allow'=>'POST']];
    if (($headers['origin'] ?? '') !== ($config['origin'] ?? '')) return [403, ['code'=>'ORIGIN_DENIED']];
    if (($config['enabled'] ?? false) !== true) return [503, ['code'=>'SUBMISSION_UNAVAILABLE']];
    if (strtolower(trim(explode(';', $headers['content-type'] ?? '')[0])) !== 'application/json') return [415, ['code'=>'JSON_REQUIRED']];
    if (strlen($body) > 24576) return [413, ['code'=>'PAYLOAD_TOO_LARGE']];
    $key = $headers['idempotency-key'] ?? '';
    if (!preg_match('/^[a-zA-Z0-9-]{16,80}$/D', $key)) return [400, ['code'=>'INVALID_REQUEST_KEY']];
    try { $input = json_decode($body, false, 32, JSON_THROW_ON_ERROR); }
    catch (Throwable) { return [400, ['code'=>'INVALID_JSON']]; }
    [$data, $errors] = parseProject($input);
    if (!$data) return [422, ['code'=>'VALIDATION_FAILED', 'errors'=>$errors]];
    $hash = hash('sha256', json_encode($data, JSON_THROW_ON_ERROR));
    $id = hash('sha256', $client);
    try {
        $decision = withState($config, function (&$state) use ($now, $id, $key, $hash, $config) {
            foreach ($state['rates'] as $k => $v) if ($v['expires'] <= $now) unset($state['rates'][$k]);
            foreach ($state['requests'] as $k => $v) if ($v['expires'] <= $now) unset($state['requests'][$k]);
            $rate = $state['rates'][$id] ?? ['count'=>0, 'expires'=>$now+60];
            if ($rate['count'] >= 5 || (!isset($state['rates'][$id]) && count($state['rates']) >= 1000))
                return [429, ['code'=>'RATE_LIMITED'], ['Retry-After'=>'60']];
            $rate['count']++; $state['rates'][$id] = $rate;
            if (isset($state['requests'][$key])) {
                $entry = $state['requests'][$key];
                if ($entry['hash'] !== $hash) return [409, ['code'=>'REQUEST_KEY_CONFLICT']];
                return $entry['status'] === 'sent'
                    ? [201, ['code'=>'DELIVERED', 'receipt'=>$entry['receipt']]]
                    : [503, ['code'=>'DELIVERY_UNCONFIRMED']];
            }
            if (($state['day'] ?? '') !== gmdate('Y-m-d', $now)) { $state['day'] = gmdate('Y-m-d', $now); $state['daily'] = 0; }
            if ($state['daily'] >= ($config['daily_limit'] ?? 50) || count($state['requests']) >= 1000)
                return [503, ['code'=>'SUBMISSION_BUSY']];
            $receipt = bin2hex(random_bytes(16));
            $state['daily']++;
            // Write before SMTP. Unknown outcomes cannot trigger a blind resend.
            $state['requests'][$key] = ['hash'=>$hash, 'expires'=>$now+86400, 'status'=>'pending', 'receipt'=>$receipt];
            return $receipt;
        });
        if (is_array($decision)) return $decision;
        try {
            if ($deliver($data, $decision) !== true) throw new RuntimeException('No delivery acknowledgement');
            withState($config, function (&$state) use ($key) { $state['requests'][$key]['status'] = 'sent'; });
            return [201, ['code'=>'DELIVERED', 'receipt'=>$decision]];
        } catch (Throwable) {
            return [503, ['code'=>'DELIVERY_UNCONFIRMED']];
        }
    } catch (Throwable) { return [503, ['code'=>'SUBMISSION_UNAVAILABLE']]; }
}

function buildGmail(array $data, string $receipt, array $config): PHPMailer {
    $address = $config['gmail_address'] ?? '';
    $recipient = $config['recipient'] ?? '';
    $password = preg_replace('/\s+/', '', $config['app_password'] ?? '');
    if (!filter_var($address, FILTER_VALIDATE_EMAIL) || !filter_var($recipient, FILTER_VALIDATE_EMAIL) || strlen($password) !== 16)
        throw new RuntimeException('Mail configuration incomplete');
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Username = $address;
    $mail->Password = $password;
    $mail->Timeout = 5;
    $mail->getSMTPInstance()->Timelimit = 10;
    $mail->SMTPDebug = 0;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom($address, 'Bürküt');
    $mail->addAddress($recipient);
    $mail->addReplyTo($data['email'], $data['name']);
    $mail->Subject = 'Bürküt — Yeni proje talebi';
    $labels = ['web'=>'Web sitesi', 'app'=>'Uygulama', 'game'=>'Oyun', 'other'=>'Diğer'];
    $mail->Body = "Yeni proje talebi\nKayıt: $receipt\n\n" .
        'Alanlar: ' . implode(', ', array_map(fn($area) => $labels[$area], $data['areas'])) . "\n" .
        "Ad: {$data['name']}\nE-posta: {$data['email']}\nTelefon: {$data['phone']}\nKurum: {$data['company']}\nBütçe: {$data['budget']}\n\nProje:\n{$data['detail']}";
    $mail->isHTML(false);
    return $mail;
}

function sendGmail(array $data, string $receipt, array $config): bool {
    return buildGmail($data, $receipt, $config)->send();
}
