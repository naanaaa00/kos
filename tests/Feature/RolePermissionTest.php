<?php

use App\Models\User;
use Inertia\Support\SessionKey;
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

it('lets a role manager change another user role from the users page', function () {
    $manager = userWithPermissions(['roles.manage']);
    Role::create(['name' => 'penghuni', 'guard_name' => 'web']);
    $target = User::factory()->create();

    $response = $this->actingAs($manager)
        ->withHeaders(['referer' => route('users.index')])
        ->patch(route('roles.users.update', $target), ['roles' => ['penghuni']]);

    $response->assertRedirect(route('users.index'));
    expect($target->fresh()->hasRole('penghuni'))->toBeTrue()
        ->and(session()->get(SessionKey::FLASH_DATA)['toast']['type'])->toBe('success');
});

it('keeps the access-management role on a manager own account', function () {
    $manager = userWithPermissions(['roles.manage']);
    Role::create(['name' => 'penghuni', 'guard_name' => 'web']);

    $this->actingAs($manager)
        ->patch(route('roles.users.update', $manager), ['roles' => ['penghuni']]);

    expect($manager->fresh()->hasRole('test-role'))->toBeTrue()
        ->and(session()->get(SessionKey::FLASH_DATA)['toast']['type'])->toBe('error');
});

it('paginates the role list', function () {
    $manager = userWithPermissions(['roles.manage']);

    foreach (range(1, 11) as $number) {
        Role::create(['name' => sprintf('role-%02d', $number), 'guard_name' => 'web']);
    }

    $response = $this->actingAs($manager)->get(route('roles.index', ['page' => 2]));

    $response->assertInertia(
        fn ($page) => $page
            ->component('Roles/Index')
            ->has('roles.data', 2)
            ->where('roles.current_page', 2)
            ->where('roles.total', 12)
    );
});
