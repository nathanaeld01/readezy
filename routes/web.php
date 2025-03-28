<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain(config('app.domains.web'))->name('web.')->group(function () {
    Route::middleware('web')->group(function () {
        Route::get('/', fn() => Inertia::render('Welcome'))->name('index');
    });
});


require __DIR__ . '/admin.php';
