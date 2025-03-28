<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $this->call([
            RoleSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Nathanael D\'Cunha',
            'email' => 'admin@example.com',
            'password' => 'testing123'
        ])->assignRole(Role::SuperAdmin);
    }
}
