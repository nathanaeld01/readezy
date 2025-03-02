<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider {
    public function boot(): void {
        parent::boot();
    }

    public function map() {
        $this->mapWebRoutes();
        $this->mapAdminRoutes();
    }

    protected function mapAdminRoutes() {
        Route::domain("admin." . config('app.url'))
            ->middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/admin.php'));
    }

    protected function mapWebRoutes() {
        Route::domain(config('app.url'))
            ->middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }
}
