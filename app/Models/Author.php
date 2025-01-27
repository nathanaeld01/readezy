<?php

namespace App\Models;

use CloudinaryLabs\CloudinaryLaravel\MediaAlly;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Author extends Model {
	use HasFactory, HasUuids, Sluggable, MediaAlly, SoftDeletes;

	protected $keyType = 'string';
	protected $table = 'authors';
	public $timestamps = true;
	protected $dates = ['deleted_at'];

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

	public function books() {
		return $this->hasMany(Book::class);
	}

	public function series() {
		return $this->hasMany(Series::class, 'author_id', 'id');
	}

	public function scopeSearch($query, $search) {
		return $query->where('slug', 'like', "%$search%")
			->orWhere('title', 'like', "%$search%");
	}

	protected $fillable = [
		'title',
		'slug',
		'image_url',
		'description'
	];
}
