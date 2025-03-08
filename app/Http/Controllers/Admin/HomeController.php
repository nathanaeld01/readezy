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
}
