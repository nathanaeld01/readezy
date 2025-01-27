<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Genre extends Model {
    use HasFactory, Sluggable, SoftDeletes;

    protected $table = 'genres';
    public $timestamps = true;
    protected $dates = ['deleted_at'];

    public function sluggable(): array {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public function books() {
        return $this->hasMany(Book::class);
    }
}
