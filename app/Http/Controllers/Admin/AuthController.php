<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller {
    public function index() {
        return Inertia::render('login');
    }

    // CRUD Operations
    public function login(LoginRequest $request): RedirectResponse {
        $request->authenticate();
        $request->session()->regenerate();

        return response()->redirectTo(route('admin.dashboard'));
    }

    public function logout(Request $request): RedirectResponse {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->redirectTo(route('admin.login'));
    }
}
