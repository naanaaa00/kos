<?php

namespace App\Services\Midtrans;

use App\Models\Tagihan;

interface MidtransService
{
    /**
     * Create a Snap transaction for the given invoice and return the
     * redirect URL to the Midtrans payment page.
     */
    public function createSnapRedirectUrl(Tagihan $tagihan): string;

    /**
     * Verify the signature of a Midtrans notification webhook payload.
     */
    public function verifikasiSignature(
        string $orderId,
        string $statusCode,
        string $grossAmount,
        string $signatureKey,
    ): bool;

    /**
     * Fetch the latest transaction status from the Midtrans API, e.g. as a
     * fallback when the notification webhook has not arrived yet.
     *
     * @return array<string, mixed>|null null bila API gagal dihubungi
     */
    public function getTransactionStatus(string $orderId): ?array;
}
