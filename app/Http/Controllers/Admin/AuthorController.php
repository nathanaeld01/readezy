<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Cloudinary;
use App\Http\Controllers\Controller;
use App\Http\Requests\Author\StoreRequest;
use App\Models\Author;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller {
	// View list of authors
	public function index(Request $request) {
		$searchTerm = $request->search;

		$authors = Author::query()
			->select(['id', 'slug', 'title', 'image_url'])
			->withCount(['books', 'series'])
			->when($searchTerm, fn($q) => $q->search($searchTerm))
			->paginate(10)
			->withQueryString()
			->through(fn($author) => tap($author, fn($a) => $a->image_url = Cloudinary::image($a->image_url, 'c_fill,g_face,w_100,h_100')));

		return Inertia::render('authors/index', [
			'authors' => $authors->items(),
			'searchTerm' => $searchTerm,
			'pagination' => collect($authors)->except('data'),
		]);
	}

	public function create() {
		return Inertia::render('authors/create');
	}

	public function show(Request $request) {
		$author = Author::query()
			->where('slug', $request->slug)
			->firstOrFail();

		unset($author->id);

		$author->image_url = image_url($author->image_url);
		$author->description = unserialize($author->description);

		return Inertia::render('authors/view', compact('author'));
	}

	// View author edit form
	public function edit(Request $request) {
		$author = Author::query()
			->where('slug', $request->slug)
			->firstOrFail();

		$author->image_url = image_url($author->image_url);
		$author->description = unserialize($author->description);

		return Inertia::render('authors/edit', compact('author'));
	}

	// CRUD Operations
	public function retrieve(Request $request) {
		$query = Author::query();

		if ($request->has('search')) {
			$query->search($request->search);
		}

		$columns = $request->input('for') === 'assign' ? ['slug', 'title'] : ['*'];
		$authors = $query->get($columns);

		return response()->json($authors, 200);
	}

	public function store(StoreRequest $request) {
		if (!$request->user()) {
			return response()->json(['message' => 'You need to be logged in'], 401);
		}

		if (!$request->user()->hasRole('admin')) {
			return response()->json(['message' => 'You do not have permission to create an author'], 403);
		}

		$request->validated();

		$slug = SlugService::createSlug(Author::class, 'slug', $request->author_name);
		$authorData = [
			'slug' => $slug,
			'title' => $request->author_name,
			'image_url' => Cloudinary::upload($request->author_image, [
				'public_id' => $slug,
				'folder' => 'authors',
				'transformation' => 'author',
			]),
			'description' => $request->author_description,
		];

		$author = Author::firstOrCreate(['slug' => $slug], $authorData);

		return $author->wasRecentlyCreated
			? response()->json(['message' => 'Author created successfully'], 201)
			: response()->json(['message' => 'Author already exists'], 409);
	}

	public function destroy(Request $request) {
		if (!$request->user()) {
			return response()->json(['message' => 'You need to be logged in'], 401);
		}

		if (!$request->user()->hasRole('admin')) {
			return response()->json(['message' => 'You do not have permission to delete an author'], 403);
		}

		$request->validated();

		$author = Author::where('slug', $request->slug)->firstOrFail();

		if ($author->image_url) {
			cloudinary()->destroy(str_replace('.webp', '', $author->image_url));
		}
		$author->forceDelete();

		return response()->json(['message' => 'Author deleted successfully'], 200);
	}
}
