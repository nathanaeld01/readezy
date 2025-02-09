<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Cjmellor\BrowserSessions\Facades\BrowserSessions;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SessionController extends Controller {
	public function destroy(Request $request) {
		if ($request->user()) {
			try {
				BrowserSessions::logoutOtherBrowserSessions();
			} catch (ValidationException $e) {
				return response()->json($e->getMessage(), 422);
			} catch (\Exception $e) {
				return response()->json($e->getMessage(), 500);
			}

			return response()->json(['message' => 'Logged out from other browser sessions successfully.']);
		}

		return response()->json(['message' => 'No authenticated user found.'], 401);
	}
}
