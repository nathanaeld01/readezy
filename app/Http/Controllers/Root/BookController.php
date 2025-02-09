<?php

namespace App\Http\Controllers\Root;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller {
    public function index(Request $request) {
        $book = Book::query()
            ->where('slug', $request->slug)
            ->firstOrFail(['slug', 'title', 'deleted_at']);

        if (!$book || $book->deleted_at) {
            abort(404, 'Book not found');
        }

        return Inertia::render('book', [
            'title' => $book->title,
            'slug' => $book->slug,
        ]);
    }

    public function find(Request $request) {
        $book = Book::with(['author:id,slug,title,description,image_url', 'genre:id,slug,title', 'series:id,slug,title'])
            ->where('slug', $request->slug)
            ->firstOrFail(['slug', 'title', 'serial', 'image_url', 'description', 'price', 'publisher', 'published_on', 'language', 'pages', 'isbn', 'author_id', 'genre_id', 'series_id']);

        $book->image_url = image_url($book->image_url);
        $book->description = unserialize($book->description) ?: null;
        $book->price = number_format($book->price, 2);

        unset($book->author_id, $book->genre_id, $book->series_id);

        return response()->json(compact('book', 'author', 'genre', 'series'));
    }
}
