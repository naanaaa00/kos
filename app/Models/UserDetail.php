<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['nama', 'nik', 'alamat', 'jenis_kelamin', 'user_id'])]
class UserDetail extends Model
{
    protected $table = 'user_detail';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
