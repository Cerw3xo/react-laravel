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
        Schema::table('items', function (Blueprint $table) {
            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('count')->default(0);
            $table->dropColumn('message');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('message', function (Blueprint $table) {
            $table->string('message');
            $table->dropColumn('name');
            $table->dropColumn('description');
            $table->dropColumn('price');
            $table->dropColumn('count');
        });
    }
};
