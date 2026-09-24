<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['tanggal_mulai', 'tanggal_selesai', 'user_id', 'kamar_id'])]
class Sewa extends Model
{
    protected $table = 'sewa';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Kamar::class, 'kamar_id');
    }

    public function tagihans(): HasMany
    {
        return $this->hasMany(Tagihan::class, 'sewa_id');
    }

    protected function casts(): array
    {
        return [
            'tanggal_mulai' => 'date',
            'tanggal_selesai' => 'date',
        ];
    }
}
