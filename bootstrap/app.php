<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
	->withRouting(
		web: __DIR__ . '/../routes/web.php',
		commands: __DIR__ . '/../routes/console.php',
		health: '/up',
	)
	->withMiddleware(function (Middleware $middleware) {
		$middleware->web(append: [
			\App\Http\Middleware\HandleInertiaRequests::class,
			\Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
		]);

		$middleware->redirectGuestsTo(function (Request $request) {
			return $request->routeIs('admin.*') ? route('admin.login') : route('login');
		});

		$middleware->alias([
			'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
			'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
			'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,

			'admin.domain' => \App\Http\Middleware\AdminDomainMiddleware::class,
			'web.domain' => \App\Http\Middleware\WebDomainMiddleware::class,
		]);
	})
	->withExceptions(function (Exceptions $exceptions) {
		//
	})->create();
