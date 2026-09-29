<?php

namespace App\Services\WhatsApp;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class FonnteWhatsAppService implements WhatsAppService
{
    public function sendMessage(string $target, string $message): bool
    {
        $response = Http::asForm()
            ->withHeaders([
                'Authorization' => (string) config('whatsapp.fonnte.token'),
            ])
            ->post((string) config('whatsapp.fonnte.url'), [
                'target' => $target,
                'message' => $message,
            ]);

        if ($response->failed()) {
            Log::warning('Fonnte request gagal', [
                'target' => $target,
                'http_status' => $response->status(),
            ]);

            return false;
        }

        $payload = $response->json();

        // Fonnte mengembalikan status true baik sebagai boolean maupun string.
        $accepted = is_array($payload)
            && in_array($payload['status'] ?? null, [true, 'true'], true);

        if (! $accepted) {
            Log::warning('Fonnte menolak pesan', [
                'target' => $target,
                'response' => $payload,
            ]);
        }

        return $accepted;
    }
}
