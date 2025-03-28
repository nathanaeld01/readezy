<?php

namespace App\Enums;

enum Role: string {
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';
    case User = 'user';

    public static function admins(): array {
        return [static::SuperAdmin, static::Admin];
    }

    public function label(): string {
        return match ($this) {
            static::SuperAdmin => 'Super Admin',
            static::Admin => 'Admin',
            static::User => 'User',
        };
    }
}
