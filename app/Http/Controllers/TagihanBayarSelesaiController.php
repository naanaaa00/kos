<?php

namespace App\Http\Controllers;

use App\Services\Midtrans\MidtransService;
use App\Services\Midtrans\PencatatPembayaranMidtrans;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TagihanBayarSelesaiController extends Controller
{
    /**
     * Halaman kembalian (finish URL) dari Snap Midtrans. Data query dari
     * Midtrans tidak dipercaya langsung: signature diverifikasi, lalu status
     * terbaru diambil dari API Midtrans sebelum pembayaran dicatat. Dengan
     * begitu status lunas tetap ter-update meski webhook notifikasi belum tiba.
     */
    public function __invoke(Request $request, MidtransService $midtrans, PencatatPembayaranMidtrans $pencatat): Response
    {
        $data = $request->validate([
            'order_id' => ['required', 'string'],
            'status_code' => ['required', 'string'],
            'gross_amount' => ['required', 'numeric'],
            'signature_key' => ['required', 'string'],
        ]);

        if (! $midtrans->verifikasiSignature($data['order_id'], $data['status_code'], $data['gross_amount'], $data['signature_key'])) {
            abort(403, 'Tautan pembayaran tidak valid.');
        }

        $tagihan = $pencatat->cariTagihan($data['order_id']);

        if ($tagihan === null) {
            abort(404, 'Tagihan tidak ditemukan.');
        }

        $transaksi = $midtrans->getTransactionStatus($data['order_id']);

        if ($transaksi !== null && $pencatat->apakahLunas($transaksi)) {
            $pencatat->catatLunas($tagihan, $transaksi, $data['order_id']);

            return response()->view('bayar.sudah-lunas', ['tagihan' => $tagihan]);
        }

        return response()->view('bayar.diproses', [
            'tagihan' => $tagihan,
            'statusTransaksi' => $transaksi['transaction_status'] ?? null,
        ]);
    }
}
