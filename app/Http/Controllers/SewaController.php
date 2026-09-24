<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use App\Models\Sewa;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SewaController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Sewa/Index', [
            'sewas' => Sewa::query()
                ->with(['user', 'room'])
                ->when(! $user->can('sewa.update'), fn ($query) => $query->where('user_id', $user->id))
                ->latest('id')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Sewa/Create', [
            'users' => User::query()->whereDoesntHave('sewa')->orderBy('name')->get(['id', 'name']),
            'kamars' => Kamar::query()->where('ketersediaan', true)->orderBy('no_kamar')->get(['id', 'no_kamar', 'harga']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        DB::transaction(function () use ($validated): void {
            $room = Kamar::query()->lockForUpdate()->findOrFail($validated['kamar_id']);

            if (! $room->ketersediaan) {
                abort(422, 'Kamar yang dipilih sudah tidak tersedia.');
            }

            if (Sewa::query()->where('user_id', $validated['user_id'])->exists()) {
                abort(422, 'Penghuni yang dipilih sudah memiliki sewa.');
            }

            $sewa = Sewa::create($validated);
            $room->update(['ketersediaan' => false]);

            $sewa->tagihans()->create([
                'tanggal' => $validated['tanggal_mulai'],
                'jumlah' => $room->harga,
                'jatuh_tempo' => $validated['tanggal_mulai'],
                'status_tagihan' => 'belum_bayar',
                'discount' => 0,
                'denda' => 0,
            ]);
        });

        return to_route('sewa.index')->with('success', 'Data sewa berhasil dibuat.');
    }

    public function edit(Sewa $sewa): Response
    {
        return Inertia::render('Sewa/Edit', [
            'sewa' => $sewa->load(['user', 'room']),
            'users' => User::query()->where(function ($query) use ($sewa): void {
                $query->whereDoesntHave('sewa')->orWhere('id', $sewa->user_id);
            })->orderBy('name')->get(['id', 'name']),
            'kamars' => Kamar::query()->where(function ($query) use ($sewa): void {
                $query->where('ketersediaan', true)->orWhere('id', $sewa->kamar_id);
            })->orderBy('no_kamar')->get(['id', 'no_kamar', 'harga']),
        ]);
    }

    public function update(Request $request, Sewa $sewa): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        DB::transaction(function () use ($validated, $sewa): void {
            $oldRoomId = $sewa->kamar_id;
            $newRoom = Kamar::query()->lockForUpdate()->findOrFail($validated['kamar_id']);

            if ($newRoom->id !== $oldRoomId && ! $newRoom->ketersediaan) {
                abort(422, 'Kamar yang dipilih sudah tidak tersedia.');
            }

            if (Sewa::query()->where('user_id', $validated['user_id'])->where('id', '!=', $sewa->id)->exists()) {
                abort(422, 'Penghuni yang dipilih sudah memiliki sewa.');
            }

            $sewa->update($validated);

            if ($newRoom->id !== $oldRoomId) {
                Kamar::query()->whereKey($oldRoomId)->update(['ketersediaan' => true]);
                $newRoom->update(['ketersediaan' => false]);
            }
        });

        return to_route('sewa.index')->with('success', 'Data sewa berhasil diperbarui.');
    }

    public function destroy(Sewa $sewa): RedirectResponse
    {
        $room = $sewa->room;
        $sewa->delete();

        if ($room && ! $room->sewas()->exists()) {
            $room->update(['ketersediaan' => true]);
        }

        return to_route('sewa.index')->with('success', 'Data sewa berhasil dihapus.');
    }

    /** @return array<string, array<int, mixed>> */
    private function rules(): array
    {
        return [
            'tanggal_mulai' => ['required', 'date'],
            'tanggal_selesai' => ['required', 'date', 'after:tanggal_mulai'],
            'user_id' => ['required', 'integer', Rule::exists('users', 'id')],
            'kamar_id' => ['required', 'integer', Rule::exists('kamar', 'id')],
        ];
    }
}
