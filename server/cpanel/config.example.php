<?php
declare(strict_types=1);

// Copy as config.php in /home/CPANEL_USER/burkut-private, OUTSIDE all web roots.
return [
    'enabled' => false,
    'origin' => 'https://burkut.gemnative.com',
    'gmail_address' => 'YOUR_ADDRESS@gmail.com',
    'app_password' => '', // Gmail app password, NOT your account password.
    'recipient' => 'YOUR_ADDRESS@gmail.com',
    'state_dir' => __DIR__ . '/state',
    'daily_limit' => 50,
];
