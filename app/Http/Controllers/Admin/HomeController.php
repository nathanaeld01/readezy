<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller {
    public function dashboard() {
        return Inertia::render('dashboard');
    }

    public function notifications() {
        return Inertia::render('notifications');
    }

    public function users() {
        return Inertia::render('users');
    }

    public function admins() {
        return Inertia::render('admins');
    }

    public function settings() {
        return Inertia::render('settings');
    }
}
