<?php

use App\Http\Controllers\Admin\AuthController as AdminAuth;
use App\Http\Controllers\Admin\AuthorController as AdminAuthor;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::domain(config('app.domains.admin'))->group(function () {
    Route::middleware('auth')->group(function () {
        Route::controller(AdminAuthor::class)->group(function () {
            Route::post('/author', 'store');
            Route::patch('/author/{slug}', 'update');
            Route::delete('/author', 'destroy');
        });
    });
});
