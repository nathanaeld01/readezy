<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller {
	public function update(UpdatePasswordRequest $request) {
		$request->user()->update([
			'password' => Hash::make($request->validated('new_password'))
		]);

		return response()->json(['message' => 'Password updated successfully']);
	}
}
