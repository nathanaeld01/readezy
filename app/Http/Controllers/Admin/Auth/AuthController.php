<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Actions\Cloudinary;
use App\Actions\FileToUri;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
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

	public function update(UpdateUserRequest $request): JsonResponse {
		$data = $request->validated();

		if (empty($data)) {
			return response()->json(['message' => 'No data provided'], 422);
		}

		try {
			$user = $request->user();

			if ($request->hasFile('avatar')) {
				$uploadOptions = ['folder' => 'avatars', 'transformation' => 'avatar'];

				if (!empty($user->avatar)) {
					$uploadOptions['public_id'] = Cloudinary::public_id($user->avatar);
				}

				$data['avatar'] = Cloudinary::upload(
					FileToUri::convert($request->file('avatar')),
					$uploadOptions
				);
			}

			$user->fill($data)->save();

			return response()->json(['message' => 'User updated successfully']);
		} catch (\Exception $e) {
			return response()->json(
				['message' => 'Failed to update user', 'error' => config('app.debug') ? $e->getMessage() : null],
				500
			);
		}
	}
}
