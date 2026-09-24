<?php

use App\Models\Kamar;
use App\Models\Pembayaran;
use App\Models\Sewa;
use App\Models\Tagihan;
use App\Models\User;

it('creates a rental, invoice, and payment through nested endpoints', function () {
    $authenticatedUser = userWithPermissions([
        'sewa.view', 'sewa.create', 'tagihan.view', 'tagihan.create', 'pembayaran.view', 'pembayaran.create',
    ]);
    $tenant = User::factory()->create(['name' => 'Penghuni Test']);
    $room = Kamar::create(['no_kamar' => 'A-10', 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);

    $rentalResponse = $this->actingAs($authenticatedUser)->post(route('sewa.store'), [
        'tanggal_mulai' => '2026-10-01',
        'tanggal_selesai' => '2027-09-30',
        'user_id' => $tenant->id,
        'kamar_id' => $room->id,
    ]);

    $rentalResponse->assertRedirect(route('sewa.index'));
    $rental = Sewa::query()->firstOrFail();
    $this->assertDatabaseHas('kamar', ['id' => $room->id, 'ketersediaan' => false]);
    $this->assertDatabaseHas('tagihan', [
        'sewa_id' => $rental->id,
        'tanggal' => '2026-10-01',
        'jatuh_tempo' => '2026-10-01',
        'jumlah' => 1500000,
        'status_tagihan' => 'belum_bayar',
    ]);

    $invoiceResponse = $this->actingAs($authenticatedUser)->post(route('sewa.tagihan.store', $rental), [
        'tanggal' => '2026-10-01',
        'jumlah' => 1,
        'jatuh_tempo' => '2026-10-05',
        'status_tagihan' => 'belum_bayar',
        'discount' => 100000,
        'denda' => 25000,
    ]);

    $invoiceResponse->assertRedirect(route('sewa.tagihan.index', $rental));
    $invoice = Tagihan::query()->latest('id')->firstOrFail();
    $this->assertDatabaseHas('tagihan', ['id' => $invoice->id, 'jumlah' => 1425000]);

    $paymentResponse = $this->actingAs($authenticatedUser)->post(route('tagihan.pembayaran.store', $invoice), [
        'jumlah' => 1500000,
        'tanggal_pembayaran' => '2026-10-03 10:00:00',
        'metode_pembayaran' => 'Bank',
    ]);

    $paymentResponse->assertRedirect(route('tagihan.pembayaran.index', $invoice));
    $this->assertDatabaseHas('pembayaran', [
        'tagihan_id' => $invoice->id,
        'jumlah' => 1425000,
        'metode_pembayaran' => 'Bank',
    ]);
    $this->assertDatabaseHas('tagihan', ['id' => $invoice->id, 'status_tagihan' => 'lunas']);
});

it('rejects an invalid rental period and duplicate payment for one invoice', function () {
    $authenticatedUser = userWithPermissions(['sewa.view', 'sewa.create', 'tagihan.view', 'pembayaran.view', 'pembayaran.create']);
    $tenant = User::factory()->create();
    $room = Kamar::create(['no_kamar' => 'A-11', 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);
    $rental = Sewa::create(['tanggal_mulai' => '2026-10-01', 'tanggal_selesai' => '2027-09-30', 'user_id' => $tenant->id, 'kamar_id' => $room->id]);
    $invoice = Tagihan::create(['tanggal' => '2026-10-01', 'jumlah' => 1500000, 'jatuh_tempo' => '2026-10-05', 'status_tagihan' => 'belum_bayar', 'discount' => 0, 'denda' => 0, 'sewa_id' => $rental->id]);
    Pembayaran::create(['jumlah' => 1500000, 'tanggal_pembayaran' => '2026-10-03 10:00:00', 'metode_pembayaran' => 'Cash', 'tagihan_id' => $invoice->id]);

    $invalidRental = $this->actingAs($authenticatedUser)->post(route('sewa.store'), [
        'tanggal_mulai' => '2026-10-10',
        'tanggal_selesai' => '2026-10-01',
        'user_id' => $tenant->id,
        'kamar_id' => $room->id,
    ]);
    $invalidRental->assertSessionHasErrors('tanggal_selesai');

    $duplicatePayment = $this->actingAs($authenticatedUser)->post(route('tagihan.pembayaran.store', $invoice), [
        'jumlah' => 1500000,
        'tanggal_pembayaran' => '2026-10-04 10:00:00',
        'metode_pembayaran' => 'Cash',
    ]);
    $duplicatePayment->assertSessionHasErrors('tagihan_id');
});
