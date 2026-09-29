<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidatePayLinkSignature
{
    /**
     * Validasi tautan bayar dari pesan WhatsApp dengan pesan galat yang
     * membedakan tautan kedaluwarsa dari tautan yang dimanipulasi, karena
     * middleware 'signed' bawaan memakai satu pesan "Invalid signature".
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->hasValidSignature()) {
            return $next($request);
        }

        $expires = $request->query('expires');

        if (is_numeric($expires) && (int) $expires < now()->getTimestamp()) {
            abort(403, 'Tautan pembayaran sudah kedaluwarsa. Silakan hubungi pengelola untuk mendapatkan tautan terbaru.');
        }

        abort(403, 'Tautan pembayaran tidak valid.');
    }
}
