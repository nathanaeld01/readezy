<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Series extends Model {
	use HasFactory, HasUuids, Sluggable, SoftDeletes;

	protected $keyType = 'string';
	protected $table = 'series';
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

	public function author() {
		return $this->belongsTo(Author::class);
	}

	protected $fillable = ['slug', 'title', 'author_id'];
}
