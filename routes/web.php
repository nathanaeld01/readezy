<?php

use App\Http\Controllers\Auth\WebAuthController;
use App\Http\Controllers\Root\AuthorController;
use App\Http\Controllers\Root\BookController;
use App\Http\Controllers\Root\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain(config('app.url'))->group(function () {
	Route::get('/', [HomeController::class, 'index'])
		->name('home');

	Route::get('/series', fn() => Inertia::render('series'))
		->name('series');

	Route::get('/book/{slug}', [BookController::class, 'index'])
		->name('book');

	Route::get('/author/{slug}', [AuthorController::class, 'index'])
		->name('author');

	Route::get('/login', [WebAuthController::class, 'index'])
		->name('login');

	Route::prefix('/api')->group(function () {
		Route::controller(HomeController::class)->prefix('/home')->group(function () {
			Route::get('/bestsellers', 'bestsellers');
		});

		Route::controller(BookController::class)->prefix('/book')->group(function () {
			Route::get('/{slug}', 'find');
		});

		Route::controller(AuthorController::class)->prefix('/author')->group(function () {
			Route::get('/{slug}', 'find');
		});
	});
});

require __DIR__ . '/admin.php';
