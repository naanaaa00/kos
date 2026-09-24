<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

test('users inherit permissions from their roles', function () {
    $permission = Permission::create([
        'name' => 'users.view',
        'guard_name' => 'web',
    ]);
    $role = Role::create([
        'name' => 'admin',
        'guard_name' => 'web',
    ]);
    $role->givePermissionTo($permission);

    $user = User::factory()->create();
    $user->assignRole($role);

    expect($user->hasRole('admin'))->toBeTrue()
        ->and($user->can('users.view'))->toBeTrue();
});
