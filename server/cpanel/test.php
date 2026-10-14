<?php
declare(strict_types=1);
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/ProjectMail.php';

$count = 0;
function check(bool $condition, string $label): void {
    global $count;
    if (!$condition) throw new RuntimeException($label);
    $count++;
}
$directory = sys_get_temp_dir() . '/burkut-mail-test-' . bin2hex(random_bytes(6));
$config = ['enabled'=>true, 'origin'=>'https://burkut.gemnative.com', 'state_dir'=>$directory, 'daily_limit'=>50];
$headers = ['origin'=>$config['origin'], 'content-type'=>'application/json', 'idempotency-key'=>'test-request-0001'];
$payload = ['areas'=>['web'], 'name'=>'Örnek Kullanıcı', 'email'=>'test@example.com', 'detail'=>'Sentetik test', 'phone'=>'', 'company'=>'', 'budget'=>''];
$body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
$calls = 0;
$deliver = function ($data, $receipt) use (&$calls) { $calls++; return true; };
$run = fn($h=null, $b=null, $c=null, $ip='one', $at=1000, $delivery=null) =>
    \Burkut\handleProject('POST', $h ?? $headers, $b ?? $body, $ip, $c ?? $config, $delivery ?? $deliver, $at);
try {
    check($run(c:array_replace($config, ['enabled'=>false]))[0] === 503 && $calls === 0, 'Disabled gate');
    check(\Burkut\handleProject('GET', $headers, $body, 'one', $config, $deliver)[0] === 405, 'Method');
    check($run(h:array_replace($headers, ['origin'=>'https://other.example']))[0] === 403, 'Origin');
    check($run(h:array_replace($headers, ['content-type'=>'text/plain']))[0] === 415, 'Content type');
    check($run(b:'{')[0] === 400, 'Invalid JSON');
    check($run(b:str_repeat('x', 24577))[0] === 413, 'Body limit');
    check($run(h:array_replace($headers, ['idempotency-key'=>'short']))[0] === 400, 'Request key');
    $invalid = array_replace($payload, ['name'=>"Name\r\nBcc: injected@example.com"]);
    check($run(b:json_encode($invalid))[0] === 422, 'Header injection rejected');
    check($run(b:json_encode(array_replace($payload, ['detail'=>str_repeat('😀', 2001)])))[0] === 422, 'UTF16 bound');
    $first = $run(); $second = $run();
    check($first[0] === 201 && $second === $first && $calls === 1, 'Acknowledged delivery and idempotency');
    check($run(b:json_encode(array_replace($payload, ['detail'=>'Changed'])))[0] === 409, 'Request key conflict');
    $run(); $run();
    check($run()[0] === 429, 'Client rate limit');
    $unknownHeaders = array_replace($headers, ['idempotency-key'=>'test-request-unknown']);
    $failedCalls = 0;
    $failure = function () use (&$failedCalls) { $failedCalls++; throw new RuntimeException('private upstream text'); };
    $failureResult = $run(h:$unknownHeaders, ip:'two', delivery:$failure);
    check($failureResult === [503, ['code'=>'DELIVERY_UNCONFIRMED']] && $failedCalls === 1, 'Safe unconfirmed failure');
    check($run(h:$unknownHeaders, ip:'two', delivery:$failure)[0] === 503 && $failedCalls === 1, 'No blind resend');
    check($run(h:array_replace($headers, ['idempotency-key'=>'test-request-daily']), c:array_replace($config, ['daily_limit'=>2]), ip:'three')[0] === 503, 'Global daily cap');
    check($run(at:1061)[0] === 201 && $calls === 1, 'Rate expiry keeps receipt');
    $mailConfig = $config + ['gmail_address'=>'sender@gmail.com', 'recipient'=>'recipient@gmail.com', 'app_password'=>'abcdefghijklmnop'];
    $mail = \Burkut\buildGmail($payload, 'synthetic-receipt', $mailConfig);
    check($mail->From === 'sender@gmail.com' && $mail->getToAddresses()[0][0] === 'recipient@gmail.com' && array_values($mail->getReplyToAddresses())[0][0] === 'test@example.com', 'Trusted From / To and visitor Reply-To');
    check($mail->Host === 'smtp.gmail.com' && $mail->Port === 587 && $mail->SMTPSecure === 'tls' && $mail->SMTPDebug === 0, 'SMTP TLS and no debug');
    check($mail->preSend() && str_contains($mail->getSentMIMEMessage(), 'text/plain'), 'MIME generation without network');
    check(str_contains($mail->getSentMIMEMessage(), 'multipart/alternative') && str_contains($mail->getSentMIMEMessage(), 'text/html') && str_contains($mail->AltBody, 'Sentetik test'), 'HTML with plain-text alternative');
    check(str_contains($mail->Body, 'cid:burkut-brand') && str_contains($mail->getSentMIMEMessage(), 'Content-ID: <burkut-brand>') && str_contains($mail->getSentMIMEMessage(), 'Content-Type: image/png'), 'Embedded brand logo without remote image request');
    $hostile = array_replace($payload, ['name'=>'<img src=x onerror=alert(1)>', 'detail'=>"<script>alert(1)</script>\nİkinci satır & detay"]);
    $html = \Burkut\projectEmailHtml($hostile, 'test<receipt>');
    check(!str_contains($html, '<script>') && !str_contains($html, '<img src=x') && str_contains($html, '&lt;script&gt;') && str_contains($html, 'İkinci satır &amp; detay') && str_contains($html, '<br'), 'Escape visitor HTML and preserve line breaks');
    check(str_contains($html, 'test&lt;receipt&gt;') && str_contains($html, 'mailto:test%40example.com') && str_contains($html, 'Belirtilmedi'), 'Safe receipt, reply link and optional values');
    file_put_contents($directory . '/delivery.json', '{bad');
    check($run(ip:'four')[0] === 503 && $calls === 1, 'Corrupt storage fails closed');
    echo "PHP mail: $count checks passed; no SMTP connection made.\n";
} finally {
    if (is_file($directory . '/delivery.json')) unlink($directory . '/delivery.json');
    if (is_dir($directory)) rmdir($directory);
}
