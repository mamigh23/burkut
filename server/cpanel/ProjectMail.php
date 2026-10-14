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

function projectEmailHtml(array $data, string $receipt): string {
    $escape = fn(string $text): string => htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $labels = ['web'=>'Web sitesi', 'app'=>'Uygulama', 'game'=>'Oyun', 'other'=>'Diğer'];
    $areas = $escape(implode(' · ', array_map(fn($area) => $labels[$area], $data['areas'])));
    $name = $escape($data['name']);
    $detail = nl2br($escape($data['detail']));
    $reference = $escape($receipt);
    $reply = $escape('mailto:' . rawurlencode($data['email']));
    $rows = '';
    foreach (['email'=>'E-posta', 'phone'=>'Telefon', 'company'=>'Kurum', 'budget'=>'Bütçe'] as $key => $label) {
        $value = $escape(trim($data[$key]) !== '' ? $data[$key] : 'Belirtilmedi');
        $rows .= '<tr><td width="30%" valign="top" style="padding:14px 12px 14px 0;border-bottom:1px solid #e1e8e3;color:#64756b;font-size:13px;">' . $label . '</td><td valign="top" style="padding:14px 0;border-bottom:1px solid #e1e8e3;color:#172d23;font-size:14px;font-weight:600;word-break:break-word;overflow-wrap:anywhere;">' . $value . '</td></tr>';
    }
    return <<<HTML
<!doctype html>
<html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Yeni proje talebi — Bürküt</title></head>
<body style="margin:0;padding:0;background-color:#eef2ee;color:#172d23;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Bürküt için yeni bir proje fikri var. İletişim bilgileri ve proje özeti içeride.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2ee;"><tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border:1px solid #dce5de;border-radius:20px;overflow:hidden;background-color:#ffffff;">
<tr><td style="padding:32px 28px;background-color:#0b1c17;color:#f3f7f2;">
<p style="margin:0 0 32px;font-size:28px;line-height:1;font-weight:700;letter-spacing:-1px;">bürküt<span style="color:#acd0b8;">.</span></p>
<p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#acd0b8;">YENİ PROJE TALEBİ</p>
<h1 style="margin:0;font-size:30px;line-height:1.2;font-weight:600;letter-spacing:-0.8px;">Yeni bir fikir,<br>yeni bir başlangıç.</h1>
<p style="margin:18px 0 0;font-size:14px;line-height:1.7;color:#c0d1c5;">Web siten üzerinden bir proje özeti iletildi.</p>
</td></tr>
<tr><td style="padding:28px;">
<p style="margin:0 0 10px;font-size:11px;letter-spacing:1.5px;color:#567360;">İLETİŞİM KİŞİSİ</p>
<h2 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#172d23;word-break:break-word;">{$name}</h2>
<p style="margin:0 0 20px;color:#2d6b50;font-size:13px;line-height:1.6;font-weight:600;">{$areas}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">{$rows}</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr><td style="padding:22px;background-color:#f1f5ef;border:1px solid #e1e8dc;border-radius:12px;">
<h2 style="margin:0 0 14px;color:#2d6b50;font-size:11px;letter-spacing:1.5px;">PROJE ÖZETİ</h2>
<div style="font-size:15px;line-height:1.8;color:#243b2d;word-break:break-word;overflow-wrap:anywhere;">{$detail}</div>
</td></tr></table>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr><td bgcolor="#2d6b50" style="border-radius:24px;mso-padding-alt:14px 24px;"><a href="{$reply}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">E-posta ile yanıtla &#8599;</a></td></tr></table>
<p style="margin:14px 0 0;color:#64756b;font-size:12px;line-height:1.7;">E-posta uygulamandaki Yanıtla seçeneği de talebi gönderen kişiye yönelir.</p>
</td></tr>
<tr><td style="padding:20px 28px;border-top:1px solid #e1e8e3;background-color:#fafbf8;">
<p style="margin:0 0 6px;color:#45614f;font-size:12px;font-weight:700;">Bürküt · Fikirden çalışan ürüne</p>
<p style="margin:0;color:#6b7b70;font-size:11px;line-height:1.7;word-break:break-all;">Kayıt: {$reference}<br>Bu bildirim web sitesi proje formundan oluşturuldu.</p>
</td></tr></table>
</td></tr></table></body></html>
HTML;
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
    $mail->AltBody = "Yeni proje talebi\nKayıt: $receipt\n\n" .
        'Alanlar: ' . implode(', ', array_map(fn($area) => $labels[$area], $data['areas'])) . "\n" .
        "Ad: {$data['name']}\nE-posta: {$data['email']}\nTelefon: {$data['phone']}\nKurum: {$data['company']}\nBütçe: {$data['budget']}\n\nProje:\n{$data['detail']}";
    $mail->isHTML(true);
    $mail->Body = projectEmailHtml($data, $receipt);
    return $mail;
}

function sendGmail(array $data, string $receipt, array $config): bool {
    return buildGmail($data, $receipt, $config)->send();
}
