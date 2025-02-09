<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminDomainMiddleware {
	public function handle(Request $request, Closure $next): Response {
		if ($request->getHost() === 'admin.' . config('app.url')) {
			return $next($request);
		}

		return response()->json(['status' => 'error', 'message' => 'Invalid domain access'], 403);
	}
}

class WebDomainMiddleware {
	public function handle(Request $request, Closure $next): Response {
		if ($request->getHost() === config('app.url')) {
			return $next($request);
		}

		return response()->json(['status' => 'error', 'message' => 'Invalid domain access'], 403);
	}
}
