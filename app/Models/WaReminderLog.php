<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['tagihan_id', 'user_id', 'no_hp', 'pesan', 'status', 'response'])]
class WaReminderLog extends Model
{
    protected $table = 'wa_reminder_logs';

    public function tagihan(): BelongsTo
    {
        return $this->belongsTo(Tagihan::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'response' => 'array',
        ];
    }
}
