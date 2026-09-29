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

it('creates one invoice per month for rentals longer than one month', function () {
    $authenticatedUser = userWithPermissions(['sewa.view', 'sewa.create']);
    $tenant = User::factory()->create();
    $room = Kamar::create(['no_kamar' => 'A-13', 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);

    $response = $this->actingAs($authenticatedUser)->post(route('sewa.store'), [
        'tanggal_mulai' => '2026-01-10',
        'tanggal_selesai' => '2026-03-31',
        'user_id' => $tenant->id,
        'kamar_id' => $room->id,
    ]);

    $response->assertRedirect(route('sewa.index'));
    $rental = Sewa::query()->firstOrFail();

    $this->assertDatabaseCount('tagihan', 3);
    foreach (['2026-01-10', '2026-02-10', '2026-03-10'] as $jatuhTempo) {
        $this->assertDatabaseHas('tagihan', [
            'sewa_id' => $rental->id,
            'jatuh_tempo' => $jatuhTempo,
            'jumlah' => 1500000,
            'status_tagihan' => 'belum_bayar',
        ]);
    }
});

it('does not duplicate invoices when the same rental is submitted twice', function () {
    $authenticatedUser = userWithPermissions(['sewa.view', 'sewa.create']);
    $tenant = User::factory()->create();
    $room = Kamar::create(['no_kamar' => 'A-14', 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);

    $payload = [
        'tanggal_mulai' => '2026-01-10',
        'tanggal_selesai' => '2026-03-31',
        'user_id' => $tenant->id,
        'kamar_id' => $room->id,
    ];

    $this->actingAs($authenticatedUser)->post(route('sewa.store'), $payload)->assertRedirect(route('sewa.index'));
    $this->actingAs($authenticatedUser)->post(route('sewa.store'), $payload)->assertStatus(422);

    $this->assertDatabaseCount('sewa', 1);
    $this->assertDatabaseCount('tagihan', 3);
});

it('filters rentals by status', function () {
    $authenticatedUser = userWithPermissions(['sewa.view', 'sewa.update']);

    foreach ([['aktif', today()->addMonth()], ['selesai', today()->subMonth()]] as [$expectedStatus, $tanggalSelesai]) {
        $tenant = User::factory()->create();
        $room = Kamar::create(['no_kamar' => sprintf('%s-01', strtoupper($expectedStatus[0])), 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);
        Sewa::create(['tanggal_mulai' => '2026-01-01', 'tanggal_selesai' => $tanggalSelesai->toDateString(), 'user_id' => $tenant->id, 'kamar_id' => $room->id]);
    }

    $this->actingAs($authenticatedUser)
        ->get(route('sewa.index', ['status' => 'aktif']))
        ->assertInertia(
            fn ($page) => $page
                ->component('Sewa/Index')
                ->has('sewas.data', 1)
                ->where('sewas.data.0.tanggal_selesai', today()->addMonth()->toJson())
                ->where('sewas.total', 1)
                ->where('filters.status', 'aktif')
        );

    $this->actingAs($authenticatedUser)
        ->get(route('sewa.index', ['status' => 'selesai']))
        ->assertInertia(fn ($page) => $page->has('sewas.data', 1)->where('sewas.total', 1));

    $this->actingAs($authenticatedUser)
        ->get(route('sewa.index'))
        ->assertInertia(fn ($page) => $page->has('sewas.data', 2)->where('sewas.total', 2));
});

it('filters invoices by payment status', function () {
    $authenticatedUser = userWithPermissions(['sewa.view', 'tagihan.view', 'tagihan.update']);
    $tenant = User::factory()->create();
    $room = Kamar::create(['no_kamar' => 'A-20', 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);
    $rental = Sewa::create(['tanggal_mulai' => '2026-01-01', 'tanggal_selesai' => '2026-12-31', 'user_id' => $tenant->id, 'kamar_id' => $room->id]);

    foreach (['belum_bayar', 'lunas', 'lunas'] as $status) {
        Tagihan::create(['tanggal' => '2026-01-01', 'jumlah' => 1500000, 'jatuh_tempo' => '2026-01-31', 'status_tagihan' => $status, 'discount' => 0, 'denda' => 0, 'sewa_id' => $rental->id]);
    }

    $this->actingAs($authenticatedUser)
        ->get(route('sewa.tagihan.index', ['sewa' => $rental, 'status' => 'lunas']))
        ->assertInertia(
            fn ($page) => $page
                ->component('Tagihan/Index')
                ->has('tagihans.data', 2)
                ->where('tagihans.data.0.status_tagihan', 'lunas')
                ->where('tagihans.total', 2)
                ->where('filters.status', 'lunas')
        );

    $this->actingAs($authenticatedUser)
        ->get(route('sewa.tagihan.index', ['sewa' => $rental, 'status' => 'belum_bayar']))
        ->assertInertia(fn ($page) => $page->has('tagihans.data', 1)->where('tagihans.total', 1));

    $this->actingAs($authenticatedUser)
        ->get(route('sewa.tagihan.index', $rental))
        ->assertInertia(fn ($page) => $page->has('tagihans.data', 3)->where('tagihans.total', 3));
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

it('resolves nested route bindings for tagihan and pembayaran edit, update, and destroy', function () {
    $authenticatedUser = userWithPermissions([
        'sewa.view', 'tagihan.view', 'tagihan.update', 'tagihan.delete',
        'pembayaran.view', 'pembayaran.update', 'pembayaran.delete',
    ]);
    $tenant = User::factory()->create();
    $room = Kamar::create(['no_kamar' => 'A-12', 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);
    $rental = Sewa::create(['tanggal_mulai' => '2026-10-01', 'tanggal_selesai' => '2027-09-30', 'user_id' => $tenant->id, 'kamar_id' => $room->id]);
    $invoice = Tagihan::create(['tanggal' => '2026-10-01', 'jumlah' => 1500000, 'jatuh_tempo' => '2026-10-05', 'status_tagihan' => 'belum_bayar', 'discount' => 0, 'denda' => 0, 'sewa_id' => $rental->id]);
    $payment = Pembayaran::create(['jumlah' => 1500000, 'tanggal_pembayaran' => '2026-10-03 10:00:00', 'metode_pembayaran' => 'Cash', 'tagihan_id' => $invoice->id]);

    $this->actingAs($authenticatedUser)->get(route('sewa.tagihan.edit', [$rental, $invoice]))->assertOk();

    $this->actingAs($authenticatedUser)->put(route('sewa.tagihan.update', [$rental, $invoice]), [
        'tanggal' => '2026-10-02',
        'jumlah' => 1,
        'jatuh_tempo' => '2026-10-07',
        'status_tagihan' => 'belum_bayar',
        'discount' => 50000,
        'denda' => 0,
    ])->assertRedirect(route('sewa.tagihan.index', $rental));

    $this->assertDatabaseHas('tagihan', ['id' => $invoice->id, 'tanggal' => '2026-10-02', 'jatuh_tempo' => '2026-10-07', 'jumlah' => 1450000]);

    $this->actingAs($authenticatedUser)->get(route('tagihan.pembayaran.edit', [$invoice, $payment]))->assertOk();

    $this->actingAs($authenticatedUser)->put(route('tagihan.pembayaran.update', [$invoice, $payment]), [
        'jumlah' => 1,
        'tanggal_pembayaran' => '2026-10-04 10:00:00',
        'metode_pembayaran' => 'Bank',
    ])->assertRedirect(route('tagihan.pembayaran.index', $invoice));

    $this->assertDatabaseHas('pembayaran', ['id' => $payment->id, 'jumlah' => 1450000, 'metode_pembayaran' => 'Bank']);

    $this->actingAs($authenticatedUser)->delete(route('tagihan.pembayaran.destroy', [$invoice, $payment]))->assertRedirect(route('tagihan.pembayaran.index', $invoice));
    $this->assertDatabaseMissing('pembayaran', ['id' => $payment->id]);

    $this->actingAs($authenticatedUser)->delete(route('sewa.tagihan.destroy', [$rental, $invoice]))->assertRedirect(route('sewa.tagihan.index', $rental));
    $this->assertDatabaseMissing('tagihan', ['id' => $invoice->id]);
});
