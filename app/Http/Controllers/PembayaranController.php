<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Tagihan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PembayaranController extends Controller
{
    public function index(Request $request, Tagihan $tagihan): Response
    {
        abort_unless(
            $request->user()->can('pembayaran.update') || $tagihan->sewa()->where('user_id', $request->user()->id)->exists(),
            403,
        );

        return Inertia::render('Pembayaran/Index', [
            'tagihan' => $tagihan->load('sewa.user', 'sewa.room'),
            'pembayarans' => $tagihan->payment ? collect([$tagihan->payment]) : collect(),
        ]);
    }

    public function create(Tagihan $tagihan): Response
    {
        return Inertia::render('Pembayaran/Create', [
            'tagihan' => $tagihan->load('sewa.user', 'sewa.room'),
        ]);
    }

    public function store(Request $request, Tagihan $tagihan): RedirectResponse
    {
        if ($tagihan->payment()->exists()) {
            return back()->withErrors(['tagihan_id' => 'Tagihan ini sudah memiliki pembayaran.']);
        }

        $validated = $request->validate($this->rules());

        DB::transaction(function () use ($validated, $tagihan): void {
            $tagihan->payment()->create(array_merge($validated, ['jumlah' => $tagihan->jumlah]));
            $tagihan->update(['status_tagihan' => 'lunas']);
        });

        return to_route('tagihan.pembayaran.index', $tagihan)->with('success', 'Pembayaran berhasil dibuat.');
    }

    // Rute nested resource menyuntikkan {tagihan} sebelum {pembayaran}, jadi urutan parameter harus sesuai.
    public function edit(Tagihan $tagihan, Pembayaran $pembayaran): Response
    {
        return Inertia::render('Pembayaran/Edit', ['pembayaran' => $pembayaran->load('tagihan.sewa.user', 'tagihan.sewa.room')]);
    }

    public function update(Request $request, Tagihan $tagihan, Pembayaran $pembayaran): RedirectResponse
    {
        $validated = $request->validate($this->rules());
        $validated['jumlah'] = $tagihan->jumlah;

        $pembayaran->update($validated);
        $tagihan->update(['status_tagihan' => 'lunas']);

        return to_route('tagihan.pembayaran.index', $tagihan)->with('success', 'Pembayaran berhasil diperbarui.');
    }

    public function destroy(Tagihan $tagihan, Pembayaran $pembayaran): RedirectResponse
    {
        $pembayaran->delete();

        return to_route('tagihan.pembayaran.index', $tagihan)->with('success', 'Pembayaran berhasil dihapus.');
    }

    /** @return array<string, array<int, mixed>> */
    private function rules(): array
    {
        return [
            'jumlah' => ['required', 'integer', 'min:0'],
            'tanggal_pembayaran' => ['required', 'date'],
            'metode_pembayaran' => ['required', Rule::in(['Bank', 'Cash'])],
        ];
    }
}
