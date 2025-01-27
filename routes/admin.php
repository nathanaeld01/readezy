<?php

use App\Http\Controllers\Admin\Auth\AuthController;
use App\Http\Controllers\Admin\Auth\PasswordController;
use App\Http\Controllers\Admin\Auth\SessionController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\SeriesController;
use Illuminate\Support\Facades\Route;

Route::domain('admin.' . config('app.url'))->name('admin.')->group(function () {
	// Guest Routes (Login)
	Route::middleware('guest')->group(function () {
		Route::get('/', [AuthController::class, 'index'])->name('login');
	});

	// API Authentication
	Route::prefix('api')->name('api.')->group(function () {
		Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
	});

	// Protected Admin Routes
	Route::middleware(['auth', 'role:super admin'])->group(function () {
		// Dashboard
		Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
		Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

		// Profile
		Route::controller(HomeController::class)->name('profile.')->group(function () {
			Route::get('/profile', 'profile')->name('index');
			Route::get('/profile/settings', 'settings')->name('settings');
		});

		// Author Management
		Route::controller(AuthorController::class)->name('authors.')->group(function () {
			Route::get('/authors', 'index')->name('index');
			Route::get('/authors/{slug}', 'show')->name('show');
			Route::get('/authors/{slug}/edit', 'edit')->name('edit');
		});

		// Genre Management
		Route::controller(GenreController::class)->name('genres.')->group(function () {
			Route::get('/genres', 'index')->name('index');
		});

		// Series Management
		Route::controller(SeriesController::class)->name('series.')->group(function () {
			Route::get('/series', 'index')->name('index');
			Route::get('/series/{slug}', 'show')->name('show');
		});

		// Book Management
		Route::controller(BookController::class)->name('books.')->group(function () {
			Route::get('/books', 'index')->name('index');
		});

		// Protected API Routes
		Route::prefix('api')->group(function () {
			// Author API Operations
			Route::controller(AuthorController::class)->group(function () {
				Route::get('/authors', 'retrieve');
				Route::post('/authors/create', 'store');
				Route::delete('/authors/{slug}', 'destroy');
			});

			// Series API Operations
			Route::controller(SeriesController::class)->group(function () {
				Route::post('/series/create', 'store');
			});

			// Profile API Operations
			Route::prefix('profile')->group(function () {
				Route::put('/update-information', [AuthController::class, 'update']);
				Route::patch('/update-password', [PasswordController::class, 'update']);
			});

			// Miscellaneous API Operations
			Route::delete('/browser-sessions', [SessionController::class, 'destroy']);
		});
	});
});
