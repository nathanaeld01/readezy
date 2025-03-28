<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware {
    protected function redirectTo(Request $request): string | null {
        if (!$request->expectsJson()) {
            $host = $request->getHost();

            if ($host === config('app.domains.admin'))
                return route('admin.login');

            if ($host === config('app.domains.web'))
                return route('web.login'); // Fallback for non-admin domains, if applicable
        }

        return null;
    }
}
