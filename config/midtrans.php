<?php

return [

    'server_key' => env('MIDTRANS_SERVER_KEY'),

    'client_key' => env('MIDTRANS_CLIENT_KEY'),

    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),

    // Endpoint Snap API mengikuti nilai is_production (sandbox vs production).
    'snap_url' => env('MIDTRANS_IS_PRODUCTION', false)
        ? 'https://app.midtrans.com'
        : 'https://app.sandbox.midtrans.com',

    // Core API (cek status transaksi) memakai host api.*, bukan app.*.
    'api_url' => env('MIDTRANS_IS_PRODUCTION', false)
        ? 'https://api.midtrans.com'
        : 'https://api.sandbox.midtrans.com',

];
