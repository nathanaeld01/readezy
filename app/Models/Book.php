<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model {
    use HasFactory, HasUUids, Sluggable;

    public function sluggable(): array {
        return [
            'slug' => [
                'method' => static function (string $string, string $separator): string {
                    $string = trim(preg_replace('/[^a-zA-Z ]/', '', $string));
                    return strtolower(preg_replace('/[^a-z]+/i', $separator, $string));
                },
                'source' => 'title'
            ]
        ];
    }
}
