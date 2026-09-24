<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['jumlah', 'tanggal_pembayaran', 'metode_pembayaran', 'tagihan_id'])]
class Pembayaran extends Model
{
    protected $table = 'pembayaran';

    public function tagihan(): BelongsTo
    {
        return $this->belongsTo(Tagihan::class, 'tagihan_id');
    }

    protected function casts(): array
    {
        return [
            'tanggal_pembayaran' => 'datetime',
        ];
    }
}
