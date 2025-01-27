<?php

namespace App\Http\Middleware;

use Cjmellor\BrowserSessions\Facades\BrowserSessions;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware {
	/**
	 * The root template that is loaded on the first page visit.
	 *
	 * @var string
	 */
	protected $rootView;

	public function __construct() {
		$this->rootView = request()->routeIs('admin.*') ? 'admin' : 'app';
	}

	/**
	 * Determine the current asset version.
	 */
	public function version(Request $request): string|null {
		return parent::version($request);
	}

	/**
	 * Define the props that are shared by default.
	 *
	 * @return array<string, mixed>
	 */
	public function share(Request $request): array {
		$user = $request->user() ? $request->user()->only('name', 'email', 'avatar') : null;
		$roles = $request->user() ? $request->user()->roles->pluck('name') : [];

		$sessions = $request->user() ? BrowserSessions::sessions() : [];

		return [
			...parent::share($request),
			'auth' => compact('user', 'roles'),
			'ziggy' => fn() => [
				'location' => $request->url(),
			],
			'sessions' => $sessions,
		];
	}
}
