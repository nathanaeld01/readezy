<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Author\DestroyRequest;
use App\Http\Requests\Author\StoreRequest;
use App\Models\Author;
use App\Services\AuthorService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller {
    // Page operations
    public function index(Request $request) {
        $request->validate([
            'search' => 'nullable|string|max:255'
        ]);

        $authors = AuthorService::listAuthors($request->input('search'));
        // return response()->json($authors->items());

        return Inertia::render('author/index', [
            'authors' => Inertia::defer(fn() => $authors->items()),
            'pagination' => collect($authors)->except('data'),
            'search' => $request->input('search')
        ]);
    }

    // CRUD operations
    public function store(StoreRequest $request): JsonResponse {
        $authorize = Gate::inspect('create', Author::class);

        if ($authorize->allowed()) {
            $data = $request->validated();
            $author = AuthorService::createAuthor($data);

            if ($author->wasRecentlyCreated) {
                return response()->json('Created author successfully', 201);
            }

            return response()->json('Author already exists', 409);
        }

        return response()->json($authorize->message(), 403);
    }

    public function destroy(DestroyRequest $request): JsonResponse {
        $authorize = Gate::inspect('delete', Author::class);

        if ($authorize->allowed()) {
            $slugs = $request->validated()['slugs'];
            $deleted = AuthorService::hideAuthors($slugs);

            return $deleted
                ? response()->json('Successfully deleted selected authors', 200)
                : response()->json('Failed to delete authors', 500);
        }

        return response()->json($authorize->message(), 403);
    }
}
