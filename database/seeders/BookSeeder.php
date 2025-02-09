<?php

namespace Database\Seeders;

use App\Constants;
use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Series;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder {
    // Run the database seeds.
    public function run(): void {
        $genreSlug = SlugService::createSlug(Genre::class, 'slug', 'Fantasy');
        $authorSlug = SlugService::createSlug(Author::class, 'slug', 'J.K. Rowling');
        $seriesSlug = SlugService::createSlug(Series::class, 'slug', 'Harry Potter');
        $bookSlug = SlugService::createSlug(Book::class, 'slug', 'Harry Potter and the Half-Blood Prince');

        $genre = Genre::firstOrCreate(['slug' => $genreSlug], [
            "title" => "Fantasy"
        ]);

        $author = Author::firstOrCreate(['slug' => $authorSlug], [
            "title" => "J.K. Rowling",
            "description" => serialize(["Joanne Rowling, known by her pen name J. K. Rowling, is a British author and philanthropist. She is the author of Harry Potter, a seven-volume fantasy novel series published from 1997 to 2007. The series has sold over 600 million copies, been translated into 84 languages, and spawned a global media franchise including films and video games."]),
            "image_url" => image_upload("https://stories.jkrowling.com/wp-content/uploads/2021/09/Shot-B-105_V2_CROP-e1630873059779.jpg", [
                "public_id" => $authorSlug,
                "folder" => "authors",
                "transformation" => Constants::authorTransforms(),
            ]),
        ]);

        $series = Series::firstOrCreate(['slug' => $seriesSlug], [
            "title" => "Harry Potter",
            "author_id" => $author->id,
        ]);

        Book::firstOrCreate(['slug' => $bookSlug], [
            "description" => serialize(["\"There it was, hanging in the sky above the school: the blazing green skull with a serpent tongue, the mark Death Eaters left behind whenever they had entered a building … wherever they had murdered …\"", "When Dumbledore arrives at Privet Drive one summer night to collect Harry Potter, his wand hand is blackened and shrivelled, but he does not reveal why. Secrets and suspicion are spreading through the wizarding world, and Hogwarts itself is not safe. Harry is convinced that Malfoy bears the Dark Mark: there is a Death Eater amongst them. Harry will need powerful magic and true friends as he explores Voldemort's darkest secrets, and Dumbledore prepares him to face his destiny..."]),
            "title" => "Harry Potter and the Half-Blood Prince",
            "serial" => "6",
            "price" => (float) 419.00,
            "published_on" => convertToDate('December 8, 2015'),
            "isbn" => "978-0439785969",
            "language" => "English",
            "pages" => 652,
            "publisher" => "Pottermore Publishing",
            "image_url" => image_upload("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXG9PgwLfZ0rnMGZ0yQ2n9Xfjd3dvWHOdXg0zVav7XORgIHyuA", [
                "public_id" => $bookSlug,
                "folder" => "books",
                "transformation" => Constants::bookTransforms(),
            ]),
            "author_id" => $author->id,
            "genre_id" => $genre->id,
            "series_id" => $series->id,
        ]);
    }
}
