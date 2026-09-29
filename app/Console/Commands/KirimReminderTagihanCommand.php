<?php

namespace App\Console\Commands;

use App\Models\Tagihan;
use App\Services\TagihanReminderService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('wa:reminder-tagihan')]
#[Description('Mengirim pesan WhatsApp pengingat H-3 sebelum tagihan jatuh tempo')]
class KirimReminderTagihanCommand extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(TagihanReminderService $reminder): int
    {
        $batasJatuhTempo = today()->addDays(3);

        $tagihans = Tagihan::query()
            ->where('status_tagihan', 'belum_bayar')
            ->whereDate('jatuh_tempo', $batasJatuhTempo->toDateString())
            ->whereDoesntHave('waReminderLogs', fn ($query) => $query->where('status', 'terkirim'))
            ->with(['sewa.user', 'sewa.room'])
            ->get();

        if ($tagihans->isEmpty()) {
            $this->info('Tidak ada tagihan yang jatuh tempo H-3 hari ini.');

            return self::SUCCESS;
        }

        foreach ($tagihans as $tagihan) {
            $this->kirimReminder($tagihan, $reminder);
        }

        return self::SUCCESS;
    }

    private function kirimReminder(Tagihan $tagihan, TagihanReminderService $reminder): void
    {
        $penyewa = $tagihan->sewa?->user;

        if (! $penyewa?->no_hp) {
            $this->warn("Tagihan #{$tagihan->id} dilewati: penyewa tidak memiliki nomor HP.");

            return;
        }

        $reminder->kirim($tagihan)
            ? $this->info("Reminder terkirim ke {$penyewa->name} untuk tagihan #{$tagihan->id}.")
            : $this->error("Reminder gagal dikirim ke {$penyewa->name} untuk tagihan #{$tagihan->id}.");
    }
}
