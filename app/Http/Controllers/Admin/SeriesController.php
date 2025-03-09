<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeriesController extends Controller {
    public function index() {
        return Inertia::render('series/index');
    }
}
