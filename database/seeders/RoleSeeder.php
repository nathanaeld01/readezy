<?php

namespace Database\Seeders;

use App\Enums\Permission as PermissionEnum;
use App\Enums\Role as RoleEnum;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder {
    public function run(): void {
        // Create roles
        Role::firstOrCreate(['name' => RoleEnum::SuperAdmin->value]); // No permissions needed
        $admin = Role::firstOrCreate(['name' => RoleEnum::Admin->value]);
        Role::firstOrCreate(['name' => RoleEnum::User->value]); // Optional, no permissions

        // Create all permissions
        $models = ['admin', 'author', 'series', 'book', 'genre'];
        $actions = array_map(fn($case) => $case->value, PermissionEnum::cases());

        foreach ($models as $model) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => "{$model}:{$action}"]);
            }
        }

        // Assign permissions only to Admin
        $adminPermissions = [
            'author:create',
            'author:edit',
            'author:hide',
            'series:create',
            'series:edit',
            'series:hide',
            'book:create',
            'book:edit',
            'book:hide',
            'genre:create',
            'genre:edit',
            'genre:hide',
        ];
        $admin->syncPermissions($adminPermissions);
    }
}
