<?php

namespace App\Services;

use App\Models\Tagihan;
use App\Models\WaReminderLog;
use App\Services\WhatsApp\WhatsAppService;
use Illuminate\Support\Facades\URL;

final class TagihanReminderService
{
    public function __construct(private WhatsAppService $whatsapp) {}

    /**
     * Kirim pesan WhatsApp pengingat untuk satu tagihan dan catat hasilnya.
     *
     * @return bool true bila pesan diterima gateway
     */
    public function kirim(Tagihan $tagihan): bool
    {
        $sewa = $tagihan->sewa;
        $penyewa = $sewa?->user;

        if (! $penyewa?->no_hp) {
            return false;
        }

        $noHp = (string) $penyewa->no_hp;
        $pesan = $this->susunPesan($tagihan);

        $terkirim = $this->whatsapp->sendMessage($noHp, $pesan);

        WaReminderLog::create([
            'tagihan_id' => $tagihan->id,
            'user_id' => $penyewa->id,
            'no_hp' => $noHp,
            'pesan' => $pesan,
            'status' => $terkirim ? 'terkirim' : 'gagal',
        ]);

        return $terkirim;
    }

    private function susunPesan(Tagihan $tagihan): string
    {
        $sewa = $tagihan->sewa;
        $noKamar = $sewa?->room?->no_kamar ?? '-';

        return sprintf(
            "Halo %s,\n\n".
            "Kami ingin mengingatkan bahwa tagihan kamar %s sebesar %s akan jatuh tempo pada %s.\n\n".
            "Bayar sekarang lewat transfer bank / QRIS / e-wallet lewat tautan berikut:\n%s\n\n".
            'Mohon lakukan pembayaran sebelum tanggal tersebut. Terima kasih.',
            $sewa?->user?->name ?? 'Penyewa',
            $noKamar,
            'Rp '.number_format($tagihan->jumlah, 0, ',', '.'),
            $tagihan->jatuh_tempo->translatedFormat('d F Y'),
            $this->linkBayar($tagihan),
        );
    }

    private function linkBayar(Tagihan $tagihan): string
    {
        return URL::temporarySignedRoute(
            'tagihan.bayar.show',
            $tagihan->jatuh_tempo->addDays(30)->endOfDay(),
            ['tagihan' => $tagihan->id],
        );
    }
}
