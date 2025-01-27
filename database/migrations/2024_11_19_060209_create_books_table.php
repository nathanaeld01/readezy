<?php

use App\Models\Author;
use App\Models\Genre;
use App\Models\Series;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create('books', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->string('slug')->unique();
			$table->string('title');
			$table->string('image_url')->nullable();
			$table->mediumText('description')->nullable();
			$table->string('publisher');
			$table->date('published_on');
			$table->string('serial')->nullable();
			$table->decimal('price', 8, 2);
			$table->string('language');
			$table->string('pages');
			$table->string('isbn');

			$table->foreignUuid('author_id')->nullable()->constrained('authors')->nullOnDelete();
			$table->foreignId('genre_id')->nullable()->constrained('genres')->nullOnDelete();
			$table->foreignUuid('series_id')->nullable()->constrained('series')->nullOnDelete();

			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists('books');
	}
};
