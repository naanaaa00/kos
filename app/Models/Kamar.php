<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['no_kamar', 'harga', 'fasilitas', 'ketersediaan'])]
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
            'harga' => 'integer',
            'ketersediaan' => 'boolean',
        ];
    }
}
