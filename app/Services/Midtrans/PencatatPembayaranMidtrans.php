<?php

namespace App\Services\Midtrans;

use App\Models\Tagihan;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

final class PencatatPembayaranMidtrans
{
    /**
     * Cari tagihan dari order_id Midtrans berformat KOS-{id}-{waktu}.
     */
    public function cariTagihan(string $orderId): ?Tagihan
    {
        if (! preg_match('/^KOS-(\d+)-/', $orderId, $match)) {
            return null;
        }

        return Tagihan::query()->find((int) $match[1]);
    }

    /**
     * Status transaksi Midtrans menandakan pembayaran berhasil.
     *
     * @param  array{transaction_status?: string, fraud_status?: string}  $transaksi
     */
    public function apakahLunas(array $transaksi): bool
    {
        return in_array($transaksi['transaction_status'] ?? '', ['settlement', 'capture'], true)
            && ($transaksi['fraud_status'] ?? 'accept') === 'accept';
    }

    /**
     * Catat pembayaran lunas untuk tagihan. Idempotent: notification ulang
     * dari Midtrans tidak membuat pembayaran kedua untuk tagihan yang sama.
     *
     * @param  array{transaction_status?: string, transaction_time?: string}  $transaksi
     */
    public function catatLunas(Tagihan $tagihan, array $transaksi, string $orderId): void
    {
        DB::transaction(function () use ($tagihan, $transaksi, $orderId): void {
            if ($tagihan->payment()->exists() || $tagihan->status_tagihan === 'lunas') {
                return;
            }

            $tagihan->payment()->create([
                'jumlah' => $tagihan->jumlah,
                'tanggal_pembayaran' => Carbon::parse($transaksi['transaction_time'] ?? now()),
                'metode_pembayaran' => 'Bank',
                'order_id' => $orderId,
                'midtrans_status' => $transaksi['transaction_status'] ?? '',
            ]);
            $tagihan->update(['status_tagihan' => 'lunas']);
        });
    }
}
