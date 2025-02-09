<?php

use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
	Route::controller(RegisteredUserController::class)->group(function () {
		Route::get('/register', 'create')->name('register');
		Route::post('/register', 'store');
	});

	Route::name('password.')->group(function () {
		Route::controller(PasswordResetLinkController::class)->group(function () {
			Route::get('/forgot-password', 'create')->name('forgot');
			Route::post('/forgot-password', 'store')->name('request');
		});

		Route::controller(NewPasswordController::class)->group(function () {
			Route::get('/reset-password/{token}', 'create')->name('reset');
			Route::post('/reset-password', 'store')->name('update');
		});
	});
});
