<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {
	public function run(): void {
		User::create([
			'name' => 'Admin',
			'email' => 'admin@example.com',
			'password' => Hash::make('adminer123!'),
			'email_verified_at' => now(),
		])->assignRole('super admin');
	}
}
