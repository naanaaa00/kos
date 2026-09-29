<?php

namespace App\Http\Controllers;

use App\Models\Tagihan;
use App\Services\Midtrans\MidtransService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TagihanBayarController extends Controller
{
    /**
     * Terima link bayar dari pesan WA (signed URL, tanpa login), buat transaksi
     * Snap Midtrans, lalu arahkan penyewa ke halaman pembayaran Midtrans.
     */
    public function __invoke(Request $request, Tagihan $tagihan, MidtransService $midtrans): RedirectResponse
    {
        if ($tagihan->status_tagihan === 'lunas' || $tagihan->payment()->exists()) {
            return to_route('tagihan.bayar.lunas', ['tagihan' => $tagihan->id]);
        }

        return redirect()->away($midtrans->createSnapRedirectUrl($tagihan));
    }
}
