<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Contracts\Auth\StatefulGuard;

class ConfirmPassword {
	public function __invoke(StatefulGuard $guard, User $user, string $password) {
		if (! $guard->validate(['email' => $user->email, 'password' => $password])) {
			return false;
		}

		session(['auth.password_confirmed_at' => time()]);

		return true;
	}
}
