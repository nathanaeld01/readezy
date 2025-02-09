<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

abstract class AuthController extends Controller {
	public function logout(Request $request) {
		$request->user()->currentAccessToken()->delete();

		return response()->json([
			'status' => 'success',
			'message' => 'Logged out successfully'
		]);
	}
}

class AdminAuthController extends AuthController {
	public static function middleware(): array {
		return ['admin.domain'];
	}

	public function index(Request $request) {
		if ($request->user()) {
			return redirect()->route('admin.dashboard');
		}

		return Inertia::render('home');
	}

	public function login(Request $request) {
		// Login logic
	}

	public function create(Request $request) {
		return Inertia::render('login');
	}

	public function register(Request $request) {
		// Register logic
	}
}

class WebAuthController extends AuthController {
	public static function middleware(): array {
		return ['web.domain'];
	}

	public function index() {
		return Inertia::render('auth/login');
	}

	public function login(Request $request) {
		// Login logic
	}

	public function create(Request $request) {
		return Inertia::render('auth/register');
	}

	public function register(Request $request) {
		// Register logic
	}
}
