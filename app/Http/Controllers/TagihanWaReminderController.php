<?php

namespace App\Http\Controllers;

use App\Models\Tagihan;
use App\Services\TagihanReminderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagihanWaReminderController extends Controller
{
    /**
     * Kirim ulang pesan WhatsApp pengingat secara manual untuk satu tagihan.
     */
    public function __invoke(Request $request, Tagihan $tagihan, TagihanReminderService $reminder): RedirectResponse
    {
        if ($tagihan->status_tagihan === 'lunas') {
            Inertia::flash('toast', ['type' => 'info', 'message' => 'Tagihan ini sudah lunas, tidak perlu reminder.']);

            return back();
        }

        $penyewa = $tagihan->sewa?->user;

        if (! $penyewa?->no_hp) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Penyewa tidak memiliki nomor HP.']);

            return back();
        }

        if ($reminder->kirim($tagihan)) {
            Inertia::flash('toast', ['type' => 'success', 'message' => "Reminder WhatsApp terkirim ke {$penyewa->name}."]);

            return back();
        }

        Inertia::flash('toast', ['type' => 'error', 'message' => 'Pengiriman reminder WhatsApp gagal. Coba lagi nanti.']);

        return back();
    }
}
