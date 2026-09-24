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
        Schema::create('tagihan', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->unsignedBigInteger('jumlah');
            $table->date('jatuh_tempo');
            $table->enum('status_tagihan', ['belum_bayar', 'lunas', 'lewat_tempo'])->default('belum_bayar');
            $table->unsignedBigInteger('discount')->default(0);
            $table->unsignedBigInteger('denda')->default(0);
            $table->foreignId('sewa_id')->constrained('sewa')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan');
    }
};
