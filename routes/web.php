<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain(config('app.url'))->name('web.')->group(function () {
    Route::get('/', fn () => Inertia::render('Welcome'));
});