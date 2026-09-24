<?php

use App\Models\Kamar;

it('creates a room and redirects to the room list', function () {
    $authenticatedUser = userWithPermissions(['kamar.view', 'kamar.create']);

    $response = $this->actingAs($authenticatedUser)->post(route('kamar.store'), [
        'no_kamar' => 'A-01',
        'harga' => 1500000,
        'fasilitas' => 'Wi-Fi, kamar mandi dalam',
        'ketersediaan' => true,
    ]);

    $response->assertRedirect(route('kamar.index'));
    $this->assertDatabaseHas('kamar', ['no_kamar' => 'A-01', 'harga' => 1500000, 'ketersediaan' => true]);
});

it('updates and deletes a room', function () {
    $authenticatedUser = userWithPermissions(['kamar.view', 'kamar.update', 'kamar.delete']);
    $kamar = Kamar::create(['no_kamar' => 'A-01', 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);

    $updateResponse = $this->actingAs($authenticatedUser)->put(route('kamar.update', $kamar), [
        'no_kamar' => 'A-02',
        'harga' => 1750000,
        'fasilitas' => 'Wi-Fi, AC',
        'ketersediaan' => false,
    ]);

    $updateResponse->assertRedirect(route('kamar.index'));
    $this->assertDatabaseHas('kamar', ['id' => $kamar->id, 'no_kamar' => 'A-02', 'ketersediaan' => false]);

    $deleteResponse = $this->actingAs($authenticatedUser)->delete(route('kamar.destroy', $kamar));

    $deleteResponse->assertRedirect(route('kamar.index'));
    $this->assertModelMissing($kamar);
});

it('rejects duplicate room numbers', function () {
    $authenticatedUser = userWithPermissions(['kamar.view', 'kamar.create']);
    Kamar::create(['no_kamar' => 'A-01', 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);

    $response = $this->actingAs($authenticatedUser)->post(route('kamar.store'), [
        'no_kamar' => 'A-01',
        'harga' => 1600000,
        'fasilitas' => 'Wi-Fi',
        'ketersediaan' => true,
    ]);

    $response->assertSessionHasErrors('no_kamar');
});
