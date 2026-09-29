<?php

namespace App\Services\Midtrans;

use App\Models\Tagihan;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

final class SnapMidtransService implements MidtransService
{
    public function createSnapRedirectUrl(Tagihan $tagihan): string
    {
        $sewa = $tagihan->sewa;
        $penyewa = $sewa?->user;

        $response = Http::acceptJson()
            ->withToken(base64_encode((string) config('midtrans.server_key').':'), 'Basic')
            ->post(rtrim((string) config('midtrans.snap_url'), '/').'/snap/v1/transactions', [
                'transaction_details' => [
                    // Sufiks waktu menjamin order_id unik bila penyewa membuka
                    // link bayar lebih dari sekali untuk tagihan yang sama.
                    'order_id' => sprintf('KOS-%d-%s', $tagihan->id, now()->format('YmdHis')),
                    'gross_amount' => $tagihan->jumlah,
                ],
                'customer_details' => [
                    'first_name' => $penyewa?->name ?? 'Penyewa',
                    'phone' => (string) ($penyewa?->no_hp ?? ''),
                ],
                // Halaman kembalian Snap memicu pengecekan status via API,
                // sebagai fallback bila webhook notifikasi belum tiba.
                'callbacks' => [
                    'finish' => route('tagihan.bayar.selesai'),
                ],
            ]);

        if ($response->failed()) {
            Log::warning('Gagal membuat transaksi Snap Midtrans', [
                'tagihan_id' => $tagihan->id,
                'http_status' => $response->status(),
                'response' => $response->json(),
            ]);

            throw new RuntimeException('Gagal membuat transaksi pembayaran di Midtrans.');
        }

        $redirectUrl = $response->json('redirect_url');

        if (! is_string($redirectUrl) || $redirectUrl === '') {
            Log::warning('Respons Snap Midtrans tidak berisi redirect_url', [
                'tagihan_id' => $tagihan->id,
                'response' => $response->json(),
            ]);

            throw new RuntimeException('Gagal membuat transaksi pembayaran di Midtrans.');
        }

        return $redirectUrl;
    }

    public function verifikasiSignature(
        string $orderId,
        string $statusCode,
        string $grossAmount,
        string $signatureKey,
    ): bool {
        $expected = hash('sha512', $orderId.$statusCode.$grossAmount.(string) config('midtrans.server_key'));

        return hash_equals($expected, $signatureKey);
    }

    public function getTransactionStatus(string $orderId): ?array
    {
        $response = Http::acceptJson()
            ->withToken(base64_encode((string) config('midtrans.server_key').':'), 'Basic')
            ->get(rtrim((string) config('midtrans.api_url'), '/').'/v2/'.$orderId.'/status');

        if ($response->failed()) {
            Log::warning('Gagal mengambil status transaksi Midtrans', [
                'order_id' => $orderId,
                'http_status' => $response->status(),
            ]);

            return null;
        }

        return $response->json();
    }
}
