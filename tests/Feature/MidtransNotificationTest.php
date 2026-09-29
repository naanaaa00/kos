<?php

use App\Models\Pembayaran;
use App\Models\Tagihan;
use Illuminate\Support\Facades\Http;

function hitungSignatureMidtrans(string $orderId, string $statusCode, string $grossAmount): string
{
    return hash('sha512', $orderId.$statusCode.$grossAmount.'test-server-key');
}

function payloadNotifikasiMidtrans(Tagihan $tagihan, array $overrides = []): array
{
    $orderId = 'KOS-'.$tagihan->id.'-20260923120000';
    $payload = array_merge([
        'order_id' => $orderId,
        'status_code' => '200',
        'gross_amount' => (string) $tagihan->jumlah,
        'transaction_status' => 'settlement',
        'transaction_time' => '2026-09-23 12:00:00',
        'payment_type' => 'bank_transfer',
        'fraud_status' => 'accept',
    ], $overrides);
    $payload['signature_key'] = hitungSignatureMidtrans(
        $payload['order_id'],
        $payload['status_code'],
        $payload['gross_amount'],
    );

    return $payload;
}

beforeEach(function () {
    config(['midtrans.server_key' => 'test-server-key']);
});

it('marks the invoice as paid when a verified settlement notification arrives', function () {
    $tagihan = buatTagihanJatuhTempo(3);

    $response = $this->postJson(route('midtrans.notification'), payloadNotifikasiMidtrans($tagihan));

    $response->assertOk();
    $this->assertDatabaseHas('pembayaran', [
        'tagihan_id' => $tagihan->id,
        'metode_pembayaran' => 'Bank',
        'order_id' => 'KOS-'.$tagihan->id.'-20260923120000',
        'midtrans_status' => 'settlement',
    ]);
    $this->assertDatabaseHas('tagihan', ['id' => $tagihan->id, 'status_tagihan' => 'lunas']);
});

it('rejects notifications with an invalid signature', function () {
    $tagihan = buatTagihanJatuhTempo(3);

    $payload = payloadNotifikasiMidtrans($tagihan);
    $payload['signature_key'] = 'signature-palsu';

    $this->postJson(route('midtrans.notification'), $payload)->assertStatus(403);

    $this->assertDatabaseMissing('tagihan', ['id' => $tagihan->id, 'status_tagihan' => 'lunas']);
});

it('ignores unsuccessful transaction statuses', function () {
    Http::fake();

    $tagihan = buatTagihanJatuhTempo(3);

    $this->postJson(route('midtrans.notification'), payloadNotifikasiMidtrans($tagihan, [
        'transaction_status' => 'expire',
    ]))->assertOk();

    $this->assertDatabaseMissing('pembayaran', ['tagihan_id' => $tagihan->id]);
    $this->assertDatabaseHas('tagihan', ['id' => $tagihan->id, 'status_tagihan' => 'belum_bayar']);
});

it('does not create a second payment for an already paid invoice', function () {
    $tagihan = buatTagihanJatuhTempo(3);
    Pembayaran::create([
        'jumlah' => $tagihan->jumlah,
        'tanggal_pembayaran' => '2026-09-23 12:00:00',
        'metode_pembayaran' => 'Bank',
        'order_id' => 'KOS-'.$tagihan->id.'-20260923090000',
        'tagihan_id' => $tagihan->id,
    ]);

    $this->postJson(route('midtrans.notification'), payloadNotifikasiMidtrans($tagihan))->assertOk();

    $this->assertDatabaseCount('pembayaran', 1);
});

it('rejects notifications for unknown invoices', function () {
    $payload = payloadNotifikasiMidtrans(buatTagihanJatuhTempo(3), ['order_id' => 'KOS-99999-20260923120000']);

    $this->postJson(route('midtrans.notification'), $payload)->assertStatus(404);
});

function queryFinishMidtrans(Tagihan $tagihan): array
{
    $orderId = 'KOS-'.$tagihan->id.'-20260923120000';

    return [
        'order_id' => $orderId,
        'status_code' => '200',
        'gross_amount' => (string) $tagihan->jumlah,
        'signature_key' => hitungSignatureMidtrans($orderId, '200', (string) $tagihan->jumlah),
    ];
}

it('records the payment when the finish page confirms settlement via the status API', function () {
    Http::fake([
        'api.sandbox.midtrans.com/v2/*/status' => Http::response([
            'transaction_status' => 'settlement',
            'fraud_status' => 'accept',
            'transaction_time' => '2026-09-23 12:05:00',
        ]),
    ]);

    $tagihan = buatTagihanJatuhTempo(3);

    $this->get(route('tagihan.bayar.selesai', queryFinishMidtrans($tagihan)))->assertOk()->assertSee('Pembayaran diterima');

    $this->assertDatabaseHas('tagihan', ['id' => $tagihan->id, 'status_tagihan' => 'lunas']);
    $this->assertDatabaseHas('pembayaran', [
        'tagihan_id' => $tagihan->id,
        'order_id' => 'KOS-'.$tagihan->id.'-20260923120000',
        'midtrans_status' => 'settlement',
    ]);
});

it('shows the processing page when the status API reports a pending transaction', function () {
    Http::fake([
        'api.sandbox.midtrans.com/v2/*/status' => Http::response([
            'transaction_status' => 'pending',
        ]),
    ]);

    $tagihan = buatTagihanJatuhTempo(3);

    $this->get(route('tagihan.bayar.selesai', queryFinishMidtrans($tagihan)))->assertOk()->assertSee('diproses');

    $this->assertDatabaseMissing('pembayaran', ['tagihan_id' => $tagihan->id]);
});

it('shows the processing page when the status API cannot be reached', function () {
    Http::fake([
        'api.sandbox.midtrans.com/v2/*/status' => Http::response([], 500),
    ]);

    $tagihan = buatTagihanJatuhTempo(3);

    $this->get(route('tagihan.bayar.selesai', queryFinishMidtrans($tagihan)))->assertOk()->assertSee('diproses');

    $this->assertDatabaseMissing('pembayaran', ['tagihan_id' => $tagihan->id]);
});

it('rejects a finish URL with an invalid signature', function () {
    $tagihan = buatTagihanJatuhTempo(3);
    $query = queryFinishMidtrans($tagihan);
    $query['signature_key'] = 'palsu';

    $this->get(route('tagihan.bayar.selesai', $query))->assertForbidden();

    $this->assertDatabaseMissing('pembayaran', ['tagihan_id' => $tagihan->id]);
});
