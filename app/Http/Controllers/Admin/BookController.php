<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller {
	public function index() {
		$books = Book::query()
			->select('id', 'slug', 'title', 'author_id', 'series_id', 'genre_id', 'published_on')
			->with(['author:id,slug,title', 'series:id,slug,title', 'genre:id,slug,title'])
			->paginate(10)
			->through(function ($book) {
				unset(
					$book->id,
					$book->author_id,
					$book->series_id,
					$book->genre_id,
					$book->author->id,
					$book->series->id,
					$book->genre->id
				);
				return $book;
			});

		return Inertia::render('books/index', compact('books'));
	}

	public function create() {
		return Inertia::render('books/create');
	}
}
