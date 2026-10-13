<?php
declare(strict_types=1);

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $status, array $body): never {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
try {
    // Replace CPANEL_USER with your cPanel account name. No passwords here.
    $private = '/home/CPANEL_USER/burkut-private';
    $root = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    $resolved = realpath($private);
    // Fail closed if private files are placed inside this site's public root.
    if (!$root || !$resolved || str_starts_with($resolved . '/', $root . '/') ||
        preg_match('~/(public_html|www|htdocs)(/|$)~', str_replace('\\', '/', $resolved))) {
        respond(503, ['code' => 'SUBMISSION_UNAVAILABLE']);
    }
    require $resolved . '/vendor/autoload.php';
    require $resolved . '/ProjectMail.php';
    $config = require $resolved . '/config.php';
    if (!is_array($config)) throw new RuntimeException('Invalid config');
    $headers = [
        'origin' => $_SERVER['HTTP_ORIGIN'] ?? '',
        'content-type' => $_SERVER['CONTENT_TYPE'] ?? '',
        'idempotency-key' => $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? '',
    ];
    // Bound the read even when Content-Length is absent or forged.
    $body = file_get_contents('php://input', false, null, 0, 24577);
    $result = \Burkut\handleProject(
        $_SERVER['REQUEST_METHOD'] ?? '', $headers, $body === false ? '' : $body,
        $_SERVER['REMOTE_ADDR'] ?? 'unknown', $config,
        fn(array $data, string $receipt) => \Burkut\sendGmail($data, $receipt, $config)
    );
    foreach ($result[2] ?? [] as $name => $value) header($name . ': ' . $value);
    respond($result[0], $result[1]);
} catch (Throwable $error) {
    // Do not log messages, credentials or upstream SMTP error text.
    respond(503, ['code' => 'SUBMISSION_UNAVAILABLE']);
}
