<?php

namespace App\Models;

use App\TipeKamar;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['no_kamar', 'tipe', 'harga', 'fasilitas', 'ketersediaan'])]
class Kamar extends Model
{
    protected $table = 'kamar';

    public function sewas(): HasMany
    {
        return $this->hasMany(Sewa::class, 'kamar_id');
    }

    protected function casts(): array
    {
        return [
            'tipe' => TipeKamar::class,
            'harga' => 'integer',
            'ketersediaan' => 'boolean',
        ];
    }
}
