<?php

namespace App\Http\Controllers\Root;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Inertia\Inertia;

class HomeController extends Controller {
    public function index() {
        return Inertia::render('home');
    }

    public function bestsellers() {
        $books = Book::with('author:id,slug,title')
            ->take(5)
            ->get(['author_id', 'slug', 'title', 'image_url', 'price'])
            ->each(function ($book) {
                $book->image_url = image_url($book->image_url);
                $book->price = number_format($book->price, 2);
                unset($book->author_id, $book->author->id);
            });

        return response()->json($books);
    }
}
