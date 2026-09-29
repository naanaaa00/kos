<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wa_reminder_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tagihan_id')->constrained('tagihan')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('no_hp');
            $table->text('pesan');
            $table->enum('status', ['terkirim', 'gagal']);
            $table->json('response')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wa_reminder_logs');
    }
};
