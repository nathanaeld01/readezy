<?php

use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\SeriesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain('admin.' . config('app.url'))->name('admin.')->group(function () {
	Route::controller(HomeController::class)->group(function () {
		Route::get('/', 'dashboard')->name('dashboard');
		Route::get('/notifications', 'notifications')->name('notifications');
	});

	Route::controller(AuthorController::class)->prefix('authors')->group(function () {
		Route::get('/', 'index')->name('authors.index');
	});

	Route::controller(BookController::class)->prefix('books')->group(function () {
		Route::get('/', 'index')->name('books.index');
	});

	Route::controller(SeriesController::class)->prefix('series')->group(function () {
		Route::get('/', 'index')->name('series.index');
	});

	Route::controller(GenreController::class)->prefix('genres')->group(function () {
		Route::get('/', 'index')->name('genres.index');
	});

	Route::fallback(function () {
		return Inertia::render('404');
	});
});
