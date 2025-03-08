<?php

use App\Http\Controllers\Admin\HomeController;
use Illuminate\Support\Facades\Route;

Route::domain('admin.' . config('app.url'))->name('admin.')->group(function () {
	Route::controller(HomeController::class)->group(function () {
		Route::get('/', 'dashboard')->name('dashboard');
		Route::get('/notifications', 'notifications')->name('notifications');
	});
});
