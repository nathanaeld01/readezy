<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HomeController extends Controller {
	public function dashboard() {
		return Inertia::render('dashboard');
	}

	public function profile() {
		return Inertia::render('profile/index');
	}

	public function settings() {
		return Inertia::render('profile/settings');
	}

	// CRUD Operations
	public function update_information(UpdateUserRequest $request) {
		try {
			$data = $request->validated();
			$user = User::findOrFail(Auth::id());

			// Check if email is changing
			if (isset($data['email']) && $data['email'] !== $user->email) {
				$user->email_verified_at = null;
			}

			$user->update($data);

			return response()->json([
				'message' => 'Information updated successfully',
			]);
		} catch (\Exception $e) {
			Log::error('User update failed', [
				'user_id' => Auth::id(),
				'error' => $e->getMessage()
			]);

			return response()->json([
				'message' => 'An error occurred while updating your information'
			], 500);
		}
	}
}
