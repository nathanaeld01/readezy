<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Author extends Model {
    use HasFactory, HasUuids, Sluggable, SoftDeletes;

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

    public function scopeSearch(Builder $query, string $searchTerm): Builder {
        return $query->where('title', 'like', "%{$searchTerm}%")
            ->orWhere('slug', 'like', "%{$searchTerm}%");
    }

    public function scopeWithBasics(Builder $query): Builder {
        return $query->select('slug', 'title', 'image_url', 'date_of_birth', 'nationality');
    }

    protected $fillable = [
        'title',
        'slug',
        'image_url',
        'description',
        'nationality',
        'date_of_birth',
        'date_of_death',
        'website_url'
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at'
    ];
}
