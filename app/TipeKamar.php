<?php

namespace App;

enum TipeKamar: string
{
    case Ekonomi = 'ekonomi';
    case Premium = 'premium';
    case Vip = 'vip';

    public function label(): string
    {
        return match ($this) {
            self::Ekonomi => 'Ekonomi',
            self::Premium => 'Premium',
            self::Vip => 'VIP',
        };
    }

    /** @return list<array{value: string, label: string}> */
    public static function options(): array
    {
        return array_map(
            fn (self $tipe) => ['value' => $tipe->value, 'label' => $tipe->label()],
            self::cases(),
        );
    }
}
