<?php

namespace App\Http\Controllers\Root;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller {
    public function index(Request $request) {
        $author = Author::query()
            ->where('slug', $request->slug)
            ->firstOrFail(['slug', 'deleted_at']);

        if ($author->deleted_at) {
            abort(404, 'Author not found');
        }

        return Inertia::render('author', [
            'slug' => $author->slug,
            'title' => $author->title,
        ]);
    }

    public function find(Request $request) {
        $author = Author::query()
            ->where('slug', $request->slug)
            ->firstOrFail(['slug', 'title', 'description', 'image_url']);

        $author->description = unserialize($author->description) ?: null;
        $author->image_url = image_url($author->image_url);

        return response()->json($author);
    }
}
