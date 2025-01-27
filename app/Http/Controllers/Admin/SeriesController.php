<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Series\StoreRequest;
use App\Models\Author;
use App\Models\Series;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Inertia\Inertia;

class SeriesController extends Controller {
	// Page operations
	public function index() {
		$series = Series::query()
			->select(['id', 'slug', 'title', 'author_id'])
			->with('author:id,title')
			->withCount('books')
			->paginate(10);

		foreach ($series->items() as $item) {
			unset($item->id, $item->author_id, $item->author->id);
		}

		return Inertia::render('series/index', compact('series'));
	}

	public function create() {
		return Inertia::render('series/create');
	}

	public function show($slug) {
		$series = Series::query()
			->where('slug', '=', $slug)
			->with('author:id,title')
			->withCount('books')
			->firstOrFail();

		unset($series->id, $series->author_id, $series->author->id);

		return Inertia::render('series/show', compact('series'));
	}

	// CRUD operations
	public function store(StoreRequest $request) {
		if (!$request->user()) {
			return response()->json(['message' => 'You need to be logged in'], 401);
		}

		if (!$request->user()->hasRole('admin')) {
			return response()->json(['message' => 'You do not have permission to perform this action'], 403);
		}

		$request->validated();

		$slug = SlugService::createSlug(Series::class, 'slug', $request->title);
		$author = Author::query()->where('title', 'like', "%$request->author%")->firstOrFail();

		if (!$author) {
			return response()->json(['message' => 'Could not find author'], 404);
		}

		$series = Series::firstOrCreate(
			['slug' => $slug],
			['title' => $request->title, 'author_id' => $author->id]
		);

		return $series->wasRecentlyCreated
			? response()->json(['message' => 'Series created successfully'], 201)
			: response()->json(['message' => 'Series already exists'], 409);
	}
}
