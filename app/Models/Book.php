<?php

namespace App\Models;

use CloudinaryLabs\CloudinaryLaravel\MediaAlly;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Validator;

class Book extends Model {
    use HasFactory, HasUuids, Sluggable, MediaAlly, SoftDeletes;

    protected $keyType = 'string';
    protected $table = 'books';
    public $timestamps = true;
    protected $dates = ['deleted_at'];

    public function sluggable(): array {
        return [
            'slug' => [
                'method' => static function (string $string, string $separator): string {
                    $string = trim(preg_replace('/\b(and|or|the|an)\b/i', '', $string));
                    return strtolower(preg_replace('/[^a-z]+/i', $separator, $string));
                },
                'source' => 'title'
            ]
        ];
    }

    public function author() {
        return $this->belongsTo(Author::class);
    }

    public function series() {
        return $this->belongsTo(Series::class);
    }

    public function genre() {
        return $this->belongsTo(Genre::class);
    }
}
