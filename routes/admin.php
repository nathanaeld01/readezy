<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\SeriesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain(config('app.domains.admin'))->group(function () {
	// Guest Routes
	Route::middleware('guest')->name('admin.')->group(function () {
		Route::controller(AuthController::class)->group(function () {
			Route::get('/login', 'index')->name('login');
			Route::post('/login', 'login');
		});
	});

	// Authenticated Routes
	Route::middleware('auth')->name('admin.')->group(function () {
		// Home Controller Routes
		Route::controller(HomeController::class)->group(function () {
			Route::get('/', 'dashboard')->name('dashboard');
			Route::get('/notifications', 'notifications')->name('notifications');
			Route::get('/users', 'users')->name('users');
			Route::get('/admins', 'admins')->name('admins');
			Route::get('/settings', 'settings')->name('settings');
		});

		// Author Routes
		Route::controller(AuthorController::class)->group(function () {
			Route::get('/authors', 'index')->name('authors.index');
			Route::get('/authors/{slug}', 'show')->name('authors.show');
		});

		// Book Routes
		Route::controller(BookController::class)->group(function () {
			Route::get('/books', 'index')->name('books.index');
		});

		// Series Routes
		Route::controller(SeriesController::class)->group(function () {
			Route::get('/series', 'index')->name('series.index');
		});

		// Genre Routes
		Route::controller(GenreController::class)->group(function () {
			Route::get('/genres', 'index')->name('genres.index');
		});

		// Auth Routes
		Route::get('/logout', [AuthController::class, 'logout']);
	});

	// Fallback Route
	Route::fallback(function () {
		return Inertia::render('404');
	});
});
