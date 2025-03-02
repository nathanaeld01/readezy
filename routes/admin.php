<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain('admin.' . config('app.url'))->name('admin.')->group(function () {
	Route::get('/', fn() => Inertia::render('dashboard'))->name('dashboard');
});
