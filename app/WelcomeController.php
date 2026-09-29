<?php

namespace App;

use App\Models\Kamar;
use Inertia\Response;

class WelcomeController
{
    public function __invoke(): Response
    {
        $kamars = Kamar::query()
            ->where('ketersediaan', true)
            ->latest('created_at')
            ->get(['id', 'no_kamar', 'tipe', 'harga', 'fasilitas'])
            ->groupBy(fn (Kamar $kamar) => $kamar->tipe->value)
            ->map(fn ($group) => $group->map(fn (Kamar $kamar) => [
                'id' => $kamar->id,
                'no_kamar' => $kamar->no_kamar,
                'tipe' => $kamar->tipe->value,
                'harga' => $kamar->harga,
                'fasilitas' => $kamar->fasilitas,
            ]));

        return inertia('welcome', [
            'kamarsByTipe' => $kamars,
        ]);
    }
}
