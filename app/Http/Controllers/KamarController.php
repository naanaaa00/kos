<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use App\TipeKamar;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class KamarController extends Controller
{
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'tipe' => ['nullable', Rule::enum(TipeKamar::class)],
            'ketersediaan' => ['nullable', Rule::in(['tersedia', 'terisi'])],
        ]);

        return Inertia::render('Kamar/Index', [
            'kamars' => Kamar::query()
                ->when(
                    $validated['tipe'] ?? null,
                    fn ($query, string $tipe) => $query->where('tipe', $tipe),
                )
                ->when(
                    $validated['ketersediaan'] ?? null,
                    fn ($query, string $ketersediaan) => $query->where('ketersediaan', $ketersediaan === 'tersedia'),
                )
                ->latest('id')
                ->paginate(10)
                ->withQueryString(),
            'filters' => [
                'tipe' => $validated['tipe'] ?? null,
                'ketersediaan' => $validated['ketersediaan'] ?? null,
            ],
            'tipeOptions' => TipeKamar::options(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Kamar/Create', [
            'tipeOptions' => TipeKamar::options(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Kamar::create($request->validate($this->rules()));

        return to_route('kamar.index')->with('success', 'Kamar berhasil dibuat.');
    }

    public function edit(Kamar $kamar): Response
    {
        return Inertia::render('Kamar/Edit', [
            'kamar' => $kamar,
            'tipeOptions' => TipeKamar::options(),
        ]);
    }

    public function update(Request $request, Kamar $kamar): RedirectResponse
    {
        $kamar->update($request->validate($this->rules($kamar)));

        return to_route('kamar.index')->with('success', 'Kamar berhasil diperbarui.');
    }

    public function destroy(Kamar $kamar): RedirectResponse
    {
        $kamar->delete();

        return to_route('kamar.index')->with('success', 'Kamar berhasil dihapus.');
    }

    /** @return array<string, array<int, mixed>> */
    private function rules(?Kamar $kamar = null): array
    {
        $uniqueNoKamar = Rule::unique('kamar', 'no_kamar');

        if ($kamar !== null) {
            $uniqueNoKamar->ignore($kamar);
        }

        return [
            'no_kamar' => ['required', 'string', 'max:20', $uniqueNoKamar],
            'tipe' => ['required', Rule::enum(TipeKamar::class)],
            'harga' => ['required', 'integer', 'min:0'],
            'fasilitas' => ['required', 'string'],
            'ketersediaan' => ['required', 'boolean'],
        ];
    }
}
