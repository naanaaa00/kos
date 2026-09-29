<?php

// Entry point untuk serverless function Vercel.
// Filesystem hanya writable di /tmp, storage diarahkan via APP_STORAGE
// (lihat bootstrap/app.php).

chdir(__DIR__.'/..');

require __DIR__.'/../vendor/autoload.php';
require __DIR__.'/../public/index.php';
