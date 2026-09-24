<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['tanggal', 'jumlah', 'jatuh_tempo', 'status_tagihan', 'discount', 'denda', 'sewa_id'])]
class Tagihan extends Model
{
    protected $table = 'tagihan';

    public function sewa(): BelongsTo
    {
        return $this->belongsTo(Sewa::class, 'sewa_id');
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Pembayaran::class, 'tagihan_id');
    }

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
            'jatuh_tempo' => 'date',
            'jumlah' => 'integer',
            'discount' => 'integer',
            'denda' => 'integer',
        ];
    }
}
