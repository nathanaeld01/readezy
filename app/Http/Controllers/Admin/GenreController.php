<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Inertia\Inertia;

class GenreController extends Controller {
    public function index() {
        $genres = Genre::query()
            ->select(['id', 'slug', 'title'])
            ->withCount('books')
            ->get()
            ->each(function ($genre) {
                unset($genre->id);
            });

        return Inertia::render('genres/index', compact('genres'));
    }

    public function create() {
        return Inertia::render('genres/create');
    }
}
