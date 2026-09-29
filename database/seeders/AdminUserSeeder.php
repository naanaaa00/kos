<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Create the first admin user for initial login.
     *
     * Credentials can be overridden via the ADMIN_NO_HP and ADMIN_PASSWORD
     * environment variables.
     */
    public function run(): void
    {
        $noHp = env('ADMIN_NO_HP', '081234567890');

        $admin = User::query()->firstOrCreate(
            ['no_hp' => (int) $noHp],
            [
                'name' => env('ADMIN_NAME', 'Admin'),
                'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
            ],
        );

        $admin->assignRole('admin');
    }
}
