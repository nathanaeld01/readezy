<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\UpdateUserRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller {
	public function index() {
		return Inertia::render('home');
	}

	public function create(Request $request) {
		// create admin user form
	}

	// CRUD Operations
	public function login(LoginRequest $request) {
		$request->authenticate();
		$request->session()->regenerate();

		return response()->json(['message' => 'Login successful']);
	}

	public function register(Request $request) {
		// register logic
	}

	public function logout(Request $request): RedirectResponse {
		Auth::guard('web')->logout();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		return redirect('/');
	}

	public function update(UpdateUserRequest $request) {
		$data = $request->validated();

		if (empty($data)) {
			return response()->json(['message' => 'No data provided'], 422);
		}

		if ($request->user()->update($data)) {
			return response()->json(['message' => 'User updated successfully']);
		}

		return response()->json(['message' => 'Failed to update user'], 500);
	}
}
