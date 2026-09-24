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
        Schema::create('user_detail', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->string('nik', 16);
            $table->text('alamat');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_detail');
    }
};
