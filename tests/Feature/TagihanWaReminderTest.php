<?php

use App\Models\WaReminderLog;
use App\Services\TagihanReminderService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;

beforeEach(function () {
    Http::fake([
        'api.fonnte.com/send' => Http::response(['status' => true]),
        'app.sandbox.midtrans.com/*' => Http::response([
            'redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/abc123',
        ]),
    ]);
});

it('sends a manual WhatsApp reminder containing a payment link', function () {
    $user = userWithPermissions(['tagihan.view', 'tagihan.update']);
    $tagihan = buatTagihanJatuhTempo(3);

    $response = $this->actingAs($user)->post(route('tagihan.wa-reminder.store', $tagihan));

    $response->assertRedirect();

    Http::assertSent(function ($request) {
        return str_contains($request['message'], '/bayar/');
    });
    $this->assertDatabaseHas('wa_reminder_logs', [
        'tagihan_id' => $tagihan->id,
        'status' => 'terkirim',
    ]);
});

it('refuses a manual reminder for a paid invoice', function () {
    $user = userWithPermissions(['tagihan.view', 'tagihan.update']);
    $tagihan = buatTagihanJatuhTempo(3);
    $tagihan->update(['status_tagihan' => 'lunas']);

    $this->actingAs($user)->post(route('tagihan.wa-reminder.store', $tagihan))->assertRedirect();

    Http::assertNothingSent();
    $this->assertDatabaseCount('wa_reminder_logs', 0);
});

it('blocks visitors without the tagihan.update permission', function () {
    $user = userWithPermissions(['tagihan.view']);
    $tagihan = buatTagihanJatuhTempo(3);

    $this->actingAs($user)->post(route('tagihan.wa-reminder.store', $tagihan))->assertForbidden();
    $this->assertDatabaseCount('wa_reminder_logs', 0);
});

it('redirects a valid payment link to the Midtrans Snap page', function () {
    $tagihan = buatTagihanJatuhTempo(3);
    $link = URL::temporarySignedRoute(
        'tagihan.bayar.show',
        now()->addHours(1),
        ['tagihan' => $tagihan->id],
    );

    $response = $this->get($link);

    $response->assertRedirect('https://app.sandbox.midtrans.com/snap/v2/vtweb/abc123');
    $this->assertDatabaseCount('pembayaran', 0);
});

it('shows the paid page when the payment link is opened for a paid invoice', function () {
    $tagihan = buatTagihanJatuhTempo(3);
    $tagihan->update(['status_tagihan' => 'lunas']);
    $link = URL::temporarySignedRoute(
        'tagihan.bayar.show',
        now()->addHours(1),
        ['tagihan' => $tagihan->id],
    );

    $this->get($link)->assertRedirect(route('tagihan.bayar.lunas', ['tagihan' => $tagihan->id]));
    $this->get(route('tagihan.bayar.lunas', ['tagihan' => $tagihan->id]))->assertOk();
});

it('rejects a payment link without a valid signature', function () {
    $tagihan = buatTagihanJatuhTempo(3);

    $this->get("/bayar/{$tagihan->id}?_signature=palsu")->assertForbidden();
});

it('tells the visitor when a payment link has expired', function () {
    $tagihan = buatTagihanJatuhTempo(3);
    $link = URL::temporarySignedRoute(
        'tagihan.bayar.show',
        now()->subHour(),
        ['tagihan' => $tagihan->id],
    );

    $this->get($link)
        ->assertForbidden()
        ->assertSee('kedaluwarsa');
});

it('keeps a reminder payment link valid for 30 days after the due date', function () {
    Http::fake([
        'api.fonnte.com/send' => Http::response(['status' => true]),
        'app.sandbox.midtrans.com/*' => Http::response([
            'redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/abc123',
        ]),
    ]);

    $tagihan = buatTagihanJatuhTempo(3, ['no_hp' => '6281234567890']);

    app(TagihanReminderService::class)->kirim($tagihan);

    preg_match('/https?:\/\/\S+/', WaReminderLog::latest('id')->first()->pesan, $matches);
    $link = $matches[0];

    $this->travel(31)->days();

    $this->get($link)->assertRedirect('https://app.sandbox.midtrans.com/snap/v2/vtweb/abc123');
});
