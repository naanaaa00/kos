<?php

use App\Models\Kamar;
use App\Models\Sewa;
use App\Models\Tagihan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "pest()" function to bind different classes or traits.
|
*/

pest()->extend(TestCase::class)
    ->use(RefreshDatabase::class)
    ->in('Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function userWithPermissions(array $permissions): User
{
    $role = Role::create([
        'name' => 'test-role',
        'guard_name' => 'web',
    ]);

    $role->syncPermissions(collect($permissions)->map(
        fn (string $permission): Permission => Permission::create([
            'name' => $permission,
            'guard_name' => 'web',
        ]),
    ));

    $user = User::factory()->create();
    $user->assignRole($role);

    return $user;
}

/**
 * Buat penyewa, kamar, sewa, dan satu tagihan belum bayar yang jatuh tempo
 * beberapa hari dari hari ini.
 */
function buatTagihanJatuhTempo(int $selisihHari, array $userAttributes = []): Tagihan
{
    static $urutan = 0;
    $urutan++;

    $penyewa = User::factory()->create([
        'name' => 'Penghuni Test',
        'no_hp' => 6281234567890 + $urutan,
        ...$userAttributes,
    ]);
    $kamar = Kamar::create(['no_kamar' => 'A-'.$urutan, 'harga' => 1500000, 'fasilitas' => 'Wi-Fi', 'ketersediaan' => true]);
    $sewa = Sewa::create([
        'tanggal_mulai' => '2026-01-01',
        'tanggal_selesai' => '2026-12-31',
        'user_id' => $penyewa->id,
        'kamar_id' => $kamar->id,
    ]);

    return Tagihan::create([
        'tanggal' => '2026-01-01',
        'jumlah' => 1500000,
        'jatuh_tempo' => Carbon::today()->addDays($selisihHari)->toDateString(),
        'status_tagihan' => 'belum_bayar',
        'sewa_id' => $sewa->id,
    ]);
}
