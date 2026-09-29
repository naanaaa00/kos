<?php

namespace App\Http\Controllers;

use App\Services\Midtrans\MidtransService;
use App\Services\Midtrans\PencatatPembayaranMidtrans;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransNotificationController extends Controller
{
    /**
     * Webhook notifikasi Midtrans. Status tagihan hanya diubah di sini
     * (signature terverifikasi), bukan di halaman kembalian Midtrans.
     */
    public function __invoke(Request $request, MidtransService $midtrans, PencatatPembayaranMidtrans $pencatat): JsonResponse
    {
        $data = $request->validate([
            'order_id' => ['required', 'string'],
            'status_code' => ['required', 'string'],
            'gross_amount' => ['required', 'numeric'],
            'signature_key' => ['required', 'string'],
            'transaction_status' => ['required', 'string'],
            'fraud_status' => ['sometimes', 'string'],
            'transaction_time' => ['sometimes', 'date'],
        ]);

        if (! $midtrans->verifikasiSignature($data['order_id'], $data['status_code'], $data['gross_amount'], $data['signature_key'])) {
            Log::warning('Notifikasi Midtrans ditolak: signature tidak valid', ['order_id' => $data['order_id']]);

            return response()->json(['message' => 'Signature tidak valid.'], 403);
        }

        $tagihan = $pencatat->cariTagihan($data['order_id']);

        if ($tagihan === null) {
            return response()->json(['message' => 'Order tidak dikenal.'], 404);
        }

        if (! $pencatat->apakahLunas($data)) {
            Log::info('Notifikasi Midtrans non-berhasil diabaikan', [
                'order_id' => $data['order_id'],
                'transaction_status' => $data['transaction_status'],
            ]);

            return response()->json(['message' => 'Notifikasi dicatat.']);
        }

        $pencatat->catatLunas($tagihan, $data, $data['order_id']);

        return response()->json(['message' => 'Pembayaran tercatat.']);
    }
}
