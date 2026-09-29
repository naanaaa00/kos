<?php

use App\Models\WaReminderLog;
use Illuminate\Support\Facades\Http;

it('sends a WhatsApp reminder for unpaid invoices due in three days', function () {
    Http::fake([
        'api.fonnte.com/send' => Http::response(['status' => true]),
    ]);

    $tagihan = buatTagihanJatuhTempo(3, ['no_hp' => 6281234567890]);

    $this->artisan('wa:reminder-tagihan')->assertSuccessful();

    Http::assertSent(function ($request) use ($tagihan) {
        return $request['target'] === '6281234567890'
            && str_contains($request['message'], 'Penghuni Test')
            && str_contains($request['message'], $tagihan->sewa->room->no_kamar)
            && str_contains($request['message'], 'Rp 1.500.000');
    });

    $this->assertDatabaseHas('wa_reminder_logs', [
        'tagihan_id' => $tagihan->id,
        'no_hp' => '6281234567890',
        'status' => 'terkirim',
    ]);
});

it('does not resend a reminder that was already sent', function () {
    Http::fake();

    $tagihan = buatTagihanJatuhTempo(3, ['no_hp' => 6281234567890]);
    WaReminderLog::create([
        'tagihan_id' => $tagihan->id,
        'user_id' => $tagihan->sewa->user_id,
        'no_hp' => '6281234567890',
        'pesan' => 'reminder',
        'status' => 'terkirim',
    ]);

    $this->artisan('wa:reminder-tagihan')->assertSuccessful();

    Http::assertNothingSent();
});

it('does not send reminders for invoices that are not due in exactly three days', function () {
    Http::fake();

    buatTagihanJatuhTempo(2);
    buatTagihanJatuhTempo(4);

    $this->artisan('wa:reminder-tagihan')->assertSuccessful();

    Http::assertNothingSent();
});

it('records a failed reminder when the gateway rejects the message', function () {
    Http::fake([
        'api.fonnte.com/send' => Http::response(['status' => false, 'reason' => 'not registered']),
    ]);

    $tagihan = buatTagihanJatuhTempo(3, ['no_hp' => 6281234567890]);

    $this->artisan('wa:reminder-tagihan')->assertSuccessful();

    $this->assertDatabaseHas('wa_reminder_logs', [
        'tagihan_id' => $tagihan->id,
        'status' => 'gagal',
    ]);
});
