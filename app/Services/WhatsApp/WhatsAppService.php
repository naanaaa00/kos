<?php

namespace App\Services\WhatsApp;

interface WhatsAppService
{
    /**
     * Send a text message to the given WhatsApp number.
     *
     * @return bool true when the gateway accepted the message
     */
    public function sendMessage(string $target, string $message): bool;
}
