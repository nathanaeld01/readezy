<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class GlobalFunctionsServiceProvider extends ServiceProvider {
    /**
     * Register services.
     */
    public function register(): void {
		require_once app_path('helpers.php');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void {
        //
    }
}
