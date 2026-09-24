<?php

namespace App\Http\Controllers;

use App\Models\Sewa;
use App\Models\Tagihan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TagihanController extends Controller
{
    public function index(Request $request, Sewa $sewa): Response
    {
        abort_unless($request->user()->can('tagihan.update') || $sewa->user_id === $request->user()->id, 403);

        return Inertia::render('Tagihan/Index', [
            'sewa' => $sewa->load(['user', 'room']),
            'tagihans' => $sewa->tagihans()->with('payment')->latest('id')->get(),
        ]);
    }

    public function create(Sewa $sewa): Response
    {
        return Inertia::render('Tagihan/Create', [
            'sewa' => $sewa->load(['user', 'room']),
        ]);
    }

    public function store(Request $request, Sewa $sewa): RedirectResponse
    {
        $validated = $request->validate($this->rules());
        $validated['tanggal'] = $sewa->tanggal_mulai->toDateString();
        $validated['jatuh_tempo'] = $sewa->tanggal_mulai->toDateString();
        $validated['jumlah'] = $this->calculateTotal($sewa->room->harga, $validated['discount'], $validated['denda']);

        $sewa->tagihans()->create($validated);

        return to_route('sewa.tagihan.index', $sewa)->with('success', 'Tagihan berhasil dibuat.');
    }

    public function edit(string $tagihan): Response
    {
        $tagihan = Tagihan::with('sewa.user', 'sewa.room')->findOrFail($tagihan);

        return Inertia::render('Tagihan/Edit', [
            'tagihan' => $tagihan,
        ]);
    }

    public function update(Request $request, string $tagihan): RedirectResponse
    {
        $tagihan = Tagihan::with('sewa.room')->findOrFail($tagihan);
        $validated = $request->validate($this->rules());
        $validated['jumlah'] = $this->calculateTotal($tagihan->sewa->room->harga, $validated['discount'], $validated['denda']);

        $tagihan->update($validated);

        return to_route('sewa.tagihan.index', $tagihan->sewa)
            ->with('success', 'Tagihan berhasil diperbarui.');
    }

    public function destroy(Tagihan $tagihan): RedirectResponse
    {
        $tagihan->delete();

        return to_route('sewa.tagihan.index', $tagihan->sewa)->with('success', 'Tagihan berhasil dihapus.');
    }

    /** @return array<string, array<int, mixed>> */
    private function rules(): array
    {
        return [
            'tanggal' => ['required', 'date'],
            'jumlah' => ['required', 'integer', 'min:0'],
            'jatuh_tempo' => ['required', 'date', 'after_or_equal:tanggal'],
            'status_tagihan' => ['required', Rule::in(['belum_bayar', 'lunas', 'lewat_tempo'])],
            'discount' => ['required', 'integer', 'min:0'],
            'denda' => ['required', 'integer', 'min:0'],
        ];
    }

    private function calculateTotal(int $roomPrice, int $discount, int $fine): int
    {
        return max(0, $roomPrice - $discount + $fine);
    }
}
