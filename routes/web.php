<?php

use App\Http\Controllers\KamarController;
use App\Http\Controllers\MidtransNotificationController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SewaController;
use App\Http\Controllers\TagihanBayarController;
use App\Http\Controllers\TagihanBayarSelesaiController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\TagihanWaReminderController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ValidatePayLinkSignature;
use App\Models\Tagihan;
use App\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');

// Halaman publik untuk penyewa (dibuka dari link di pesan WhatsApp).
// 'bayar/selesai' didaftarkan sebelum 'bayar/{tagihan}' agar tidak
// tertangkap sebagai parameter {tagihan}.
Route::get('bayar/selesai', TagihanBayarSelesaiController::class)
    ->name('tagihan.bayar.selesai');
Route::get('bayar/{tagihan}', TagihanBayarController::class)
    ->middleware(ValidatePayLinkSignature::class)
    ->name('tagihan.bayar.show');
Route::get('bayar/{tagihan}/lunas', function (Tagihan $tagihan) {
    return response()->view('bayar.sudah-lunas', ['tagihan' => $tagihan]);
})->name('tagihan.bayar.lunas');

// Webhook Midtrans: tanpa auth, signature diverifikasi di dalam controller.
// Path mengikuti URL yang terdaftar di dashboard Midtrans.
Route::post('api/webhooks/midtrans', MidtransNotificationController::class)
    ->name('midtrans.notification');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('users', [UserController::class, 'index'])
        ->middleware('permission:users.view')
        ->name('users.index');
    Route::get('sewa', [SewaController::class, 'index'])
        ->middleware('permission:sewa.view')
        ->name('sewa.index');
    Route::get('sewa/{sewa}/tagihan', [TagihanController::class, 'index'])
        ->middleware('permission:tagihan.view')
        ->name('sewa.tagihan.index');
    Route::get('tagihan/{tagihan}/pembayaran', [PembayaranController::class, 'index'])
        ->middleware('permission:pembayaran.view')
        ->name('tagihan.pembayaran.index');

    Route::get('roles', [RoleController::class, 'index'])
        ->middleware('permission:roles.manage')
        ->name('roles.index');
    Route::post('roles', [RoleController::class, 'store'])
        ->middleware('permission:roles.manage')
        ->name('roles.store');
    Route::put('roles/{role}', [RoleController::class, 'update'])
        ->middleware('permission:roles.manage')
        ->name('roles.update');
    Route::delete('roles/{role}', [RoleController::class, 'destroy'])
        ->middleware('permission:roles.manage')
        ->name('roles.destroy');
    Route::patch('roles/users/{user}', [RoleController::class, 'updateUserRoles'])
        ->middleware('permission:roles.manage')
        ->name('roles.users.update');

    Route::resource('users', UserController::class)->except(['index', 'show'])
        ->middlewareFor('create', 'permission:users.create')
        ->middlewareFor('store', 'permission:users.create')
        ->middlewareFor('edit', 'permission:users.update')
        ->middlewareFor('update', 'permission:users.update')
        ->middlewareFor('destroy', 'permission:users.delete');
    Route::resource('kamar', KamarController::class)->except('show')
        ->middlewareFor('index', 'permission:kamar.view')
        ->middlewareFor('create', 'permission:kamar.create')
        ->middlewareFor('store', 'permission:kamar.create')
        ->middlewareFor('edit', 'permission:kamar.update')
        ->middlewareFor('update', 'permission:kamar.update')
        ->middlewareFor('destroy', 'permission:kamar.delete');
    Route::resource('sewa', SewaController::class)->except(['index', 'show'])
        ->middlewareFor('create', 'permission:sewa.create')
        ->middlewareFor('store', 'permission:sewa.create')
        ->middlewareFor('edit', 'permission:sewa.update')
        ->middlewareFor('update', 'permission:sewa.update')
        ->middlewareFor('destroy', 'permission:sewa.delete');

    Route::resource('sewa.tagihan', TagihanController::class)
        ->except(['index', 'show'])
        ->middlewareFor('create', 'permission:tagihan.create')
        ->middlewareFor('store', 'permission:tagihan.create')
        ->middlewareFor('edit', 'permission:tagihan.update')
        ->middlewareFor('update', 'permission:tagihan.update')
        ->middlewareFor('destroy', 'permission:tagihan.delete');

    Route::post('tagihan/{tagihan}/wa-reminder', TagihanWaReminderController::class)
        ->middleware('permission:tagihan.update')
        ->name('tagihan.wa-reminder.store');

    Route::resource('tagihan.pembayaran', PembayaranController::class)
        ->except(['index', 'show'])
        ->middlewareFor('create', 'permission:pembayaran.create')
        ->middlewareFor('store', 'permission:pembayaran.create')
        ->middlewareFor('edit', 'permission:pembayaran.update')
        ->middlewareFor('update', 'permission:pembayaran.update')
        ->middlewareFor('destroy', 'permission:pembayaran.delete');
});

require __DIR__.'/settings.php';
