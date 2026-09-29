<?php

use App\Models\Kamar;
use App\TipeKamar;

it('creates a room and redirects to the room list', function () {
    $authenticatedUser = userWithPermissions(['kamar.view', 'kamar.create']);

    $response = $this->actingAs($authenticatedUser)->post(route('kamar.store'), [
        'no_kamar' => 'A-01',
        'tipe' => TipeKamar::Premium->value,
        'harga' => 1500000,
        'fasilitas' => 'Wi-Fi, kamar mandi dalam',
        'ketersediaan' => true,
    ]);

    $response->assertRedirect(route('kamar.index'));
    $this->assertDatabaseHas('kamar', ['no_kamar' => 'A-01', 'tipe' => 'premium', 'harga' => 1500000, 'ketersediaan' => true]);
});

it('updates and deletes a room', function () {
    $authenticatedUser = userWithPermissions(['kamar.view', 'kamar.update', 'kamar.delete']);
    $kamar = Kamar::create(['no_kamar' => 'A-01', 'tipe' => TipeKamar::Ekonomi, 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);

    $updateResponse = $this->actingAs($authenticatedUser)->put(route('kamar.update', $kamar), [
        'no_kamar' => 'A-02',
        'tipe' => TipeKamar::Vip->value,
        'harga' => 1750000,
        'fasilitas' => 'Wi-Fi, AC',
        'ketersediaan' => false,
    ]);

    $updateResponse->assertRedirect(route('kamar.index'));
    $this->assertDatabaseHas('kamar', ['id' => $kamar->id, 'no_kamar' => 'A-02', 'tipe' => 'vip', 'ketersediaan' => false]);

    $deleteResponse = $this->actingAs($authenticatedUser)->delete(route('kamar.destroy', $kamar));

    $deleteResponse->assertRedirect(route('kamar.index'));
    $this->assertModelMissing($kamar);
});

it('rejects duplicate room numbers', function () {
    $authenticatedUser = userWithPermissions(['kamar.view', 'kamar.create']);
    Kamar::create(['no_kamar' => 'A-01', 'tipe' => TipeKamar::Ekonomi, 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);

    $response = $this->actingAs($authenticatedUser)->post(route('kamar.store'), [
        'no_kamar' => 'A-01',
        'tipe' => TipeKamar::Ekonomi->value,
        'harga' => 1600000,
        'fasilitas' => 'Wi-Fi',
        'ketersediaan' => true,
    ]);

    $response->assertSessionHasErrors('no_kamar');
});

it('rejects an invalid room type', function () {
    $authenticatedUser = userWithPermissions(['kamar.view', 'kamar.create']);

    $response = $this->actingAs($authenticatedUser)->post(route('kamar.store'), [
        'no_kamar' => 'B-01',
        'tipe' => 'mewah',
        'harga' => 1500000,
        'fasilitas' => 'Wi-Fi',
        'ketersediaan' => true,
    ]);

    $response->assertSessionHasErrors('tipe');
});

it('filters the room list by availability and type', function () {
    $authenticatedUser = userWithPermissions(['kamar.view']);
    Kamar::create(['no_kamar' => 'A-01', 'tipe' => TipeKamar::Ekonomi, 'harga' => 850000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);
    Kamar::create(['no_kamar' => 'A-02', 'tipe' => TipeKamar::Premium, 'harga' => 1500000, 'fasilitas' => 'Wi-Fi, AC', 'ketersediaan' => false]);
    Kamar::create(['no_kamar' => 'A-03', 'tipe' => TipeKamar::Vip, 'harga' => 2000000, 'fasilitas' => 'Wi-Fi, AC', 'ketersediaan' => true]);

    $this->actingAs($authenticatedUser)
        ->get(route('kamar.index', ['ketersediaan' => 'tersedia']))
        ->assertInertia(fn ($page) => $page
            ->component('Kamar/Index')
            ->has('kamars.data', 2)
            ->where('filters.ketersediaan', 'tersedia'));

    $this->actingAs($authenticatedUser)
        ->get(route('kamar.index', ['tipe' => 'premium']))
        ->assertInertia(fn ($page) => $page
            ->component('Kamar/Index')
            ->has('kamars.data', 1)
            ->where('kamars.data.0.no_kamar', 'A-02'));

    $this->actingAs($authenticatedUser)
        ->get(route('kamar.index', ['tipe' => 'mewah']))
        ->assertSessionHasErrors('tipe');
});

it('paginates the room list', function () {
    $authenticatedUser = userWithPermissions(['kamar.view']);

    foreach (range(1, 11) as $number) {
        Kamar::create(['no_kamar' => sprintf('A-%02d', $number), 'tipe' => TipeKamar::Ekonomi, 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);
    }

    $response = $this->actingAs($authenticatedUser)->get(route('kamar.index', ['page' => 2]));

    $response->assertOk();
    $response->assertInertia(
        fn ($page) => $page
            ->component('Kamar/Index')
            ->has('kamars.data', 1)
            ->where('kamars.current_page', 2)
            ->where('kamars.total', 11)
    );
});
