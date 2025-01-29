<?php

namespace App\Http\Middleware;

use App\Actions\Cloudinary;
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
		$auth = $request->user();

		$user = $auth ? $auth->only('name', 'email', 'avatar') : null;
		$roles = $auth ? $auth->roles->pluck('name') : null;
		$sessions = $auth ? BrowserSessions::sessions() : [];

		if (isset($user['avatar'])) {
			$user['avatar'] = Cloudinary::image($user['avatar'], 'c_fill,g_face,w_100,h_100');
		}

		return [
			...parent::share($request),
			'auth' => compact('user', 'roles'),
			'ziggy' => [
				'location' => $request->url(),
			],
			'sessions' => $sessions,
		];
	}
}
