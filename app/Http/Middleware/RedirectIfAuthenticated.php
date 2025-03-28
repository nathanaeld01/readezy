<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated as Middleware;

class RedirectIfAuthenticated extends Middleware {
    protected function redirectTo(Request $request): ?string {
        if (!$request->expectsJson()) {
            $host = $request->getHost();

            if ($host === config('app.domains.admin'))
                return route('admin.dashboard');

            if ($host === config('app.domains.web'))
                return route('web.home');
        }

        return null;
    }
}
