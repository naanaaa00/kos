<?php

use App\Models\User;

it('deletes a user and redirects to the users list', function () {
    $authenticatedUser = userWithPermissions(['users.view', 'users.delete', 'users.update']);
    $userToDelete = User::factory()->create();

    $response = $this->actingAs($authenticatedUser)->delete(route('users.destroy', $userToDelete));

    $response->assertRedirect(route('users.index'));
    $this->assertModelMissing($userToDelete);
});

it('updates the user and its detail in one request', function () {
    $authenticatedUser = userWithPermissions(['users.view', 'users.update']);
    $user = User::factory()->create();

    $response = $this->actingAs($authenticatedUser)->put(route('users.update', $user), [
        'name' => 'Updated User',
        'no_hp' => '081234567890',
        'password' => '',
        'nama' => 'Updated Detail',
        'nik' => '3201234567890123',
        'alamat' => 'Jl. Mawar No. 10',
        'jenis_kelamin' => 'P',
    ]);

    $response->assertRedirect(route('users.index'));
    $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Updated User']);
    $this->assertDatabaseHas('user_detail', [
        'user_id' => $user->id,
        'nama' => 'Updated Detail',
        'nik' => '3201234567890123',
    ]);
});
