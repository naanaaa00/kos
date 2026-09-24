<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $permissions = [
            'users.view', 'users.create', 'users.update', 'users.delete',
            'kamar.view', 'kamar.create', 'kamar.update', 'kamar.delete',
            'sewa.view', 'sewa.create', 'sewa.update', 'sewa.delete',
            'tagihan.view', 'tagihan.create', 'tagihan.update', 'tagihan.delete',
            'pembayaran.view', 'pembayaran.create', 'pembayaran.update', 'pembayaran.delete',
            'roles.manage',
        ];

        $permissionModels = collect($permissions)
            ->map(fn (string $permission): Permission => Permission::findOrCreate($permission, 'web'));

        $admin = Role::findOrCreate('admin', 'web');
        $penghuni = Role::findOrCreate('penghuni', 'web');
        $admin->syncPermissions($permissionModels);
        $penghuni->syncPermissions($permissionModels->filter(
            fn (Permission $permission): bool => str_ends_with($permission->name, '.view'),
        ));

        $user = User::factory()->create([
            'name' => 'Test User',
        ]);

        $user->assignRole($admin);
    }
}
