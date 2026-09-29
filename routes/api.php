<?php

use App\Http\Controllers\MidtransNotificationController;
use Illuminate\Support\Facades\Route;

// Webhook notifikasi Midtrans: tanpa auth, signature diverifikasi di dalam
// controller. Group API stateless dan bebas CSRF, cocok untuk notifikasi
// server-to-server dari Midtrans.
Route::post('webhooks/midtrans', MidtransNotificationController::class)
    ->name('midtrans.notification');
