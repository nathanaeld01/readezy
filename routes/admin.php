<?php

use Illuminate\Support\Facades\Route;

Route::domain('admin.' . config('app.url'))->name('admin.')->group(function () {
	Route::get('/', fn () => 'Admin');
});
