<?php

namespace App\Services;

use App\Models\Author;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class AuthorService {
    public static function listAuthors(?string $searchTerm = null): LengthAwarePaginator {
        $paginator = Author::query()
            ->withBasics()
            ->when($searchTerm, fn($query) => $query->search($searchTerm))
            ->paginate(10)
            ->withQueryString();

        // Transform the image_url for each item
        $paginator->getCollection()->transform(function ($author) {
            $author->image_url = url(Storage::url($author->image_url));
            return $author;
        });

        return $paginator;
    }

    public static function createAuthor(array $data): Author {
        $slug = SlugService::createSlug(Author::class, 'slug', $data['title']);
        $author = Author::firstOrCreate(
            ['slug' => $slug],
            [
                'title' => $data['title'],
                'description' => serialize($data['description']),
                'image_url' => 'pending-upload',
                'nationality' => $data['nationality'],
                'date_of_birth' => $data['date_of_birth'],
                'date_of_death' => $data['date_of_death'] ?? null,
                'website_url' => $data['website_url'] ?? null,
            ]
        );

        if ($author->wasRecentlyCreated) {
            $author->update(['image_url' => $data['image']->store('authors', 'public')]);
        }

        return $author;
    }

    public static function hideAuthors(array $slugs): bool {
        return (bool) Author::whereIn('slug', $slugs)
            ->whereNull('deleted_at')
            ->delete();
    }
}
