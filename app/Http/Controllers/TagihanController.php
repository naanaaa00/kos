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

        $validated = $request->validate([
            'status' => ['nullable', Rule::in(['belum_bayar', 'lunas', 'lewat_tempo'])],
        ]);

        return Inertia::render('Tagihan/Index', [
            'sewa' => $sewa->load(['user', 'room']),
            'tagihans' => $sewa->tagihans()
                ->with('payment')
                ->when($validated['status'] ?? null, fn ($query, string $status) => $query->where('status_tagihan', $status))
                ->latest('id')
                ->paginate(10)
                ->withQueryString(),
            'filters' => ['status' => $validated['status'] ?? null],
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
        $validated['jumlah'] = $this->calculateTotal($sewa->room->harga, $validated['discount'], $validated['denda']);

        $sewa->tagihans()->create($validated);

        return to_route('sewa.tagihan.index', $sewa)->with('success', 'Tagihan berhasil dibuat.');
    }

    // Rute nested resource menyuntikkan {sewa} sebelum {tagihan}, jadi urutan parameter harus sesuai.
    public function edit(Sewa $sewa, Tagihan $tagihan): Response
    {
        return Inertia::render('Tagihan/Edit', [
            'tagihan' => $tagihan->load('sewa.user', 'sewa.room'),
        ]);
    }

    public function update(Request $request, Sewa $sewa, Tagihan $tagihan): RedirectResponse
    {
        $validated = $request->validate($this->rules());
        $validated['jumlah'] = $this->calculateTotal($tagihan->sewa->room->harga, $validated['discount'], $validated['denda']);

        $tagihan->update($validated);

        return to_route('sewa.tagihan.index', $tagihan->sewa)
            ->with('success', 'Tagihan berhasil diperbarui.');
    }

    public function destroy(Sewa $sewa, Tagihan $tagihan): RedirectResponse
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
