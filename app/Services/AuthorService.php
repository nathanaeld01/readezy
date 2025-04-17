<?php

namespace App\Services;

use App\Models\Author;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\UploadedFile;
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
                'description' => implode("\r\n\r\n", $data['description']),
                'image_url' => 'pending-upload',
                'nationality' => $data['nationality'],
                'date_of_birth' => $data['date_of_birth'],
                'date_of_death' => $data['date_of_death'] ?? null,
                'website_url' => $data['website_url'] ?? null,
            ]
        );

        if ($author->wasRecentlyCreated) 
            $author->update(['image_url' => $data['image']->store('authors', 'public')]);

        return $author;
    }

    public static function updateAuthor(string $slug, array $data): bool {
        $author = Author::where('slug', $slug)->first();

        if(!empty($data['description'])) {
            $data['description'] = implode("\r\n\r\n", $data['description']);
        }

        if(!empty($data['image_url']) && $data['image'] instanceof UploadedFile) {
            if($author->image_url) 
                Storage::disk('public')->delete($author->image_url);

            $data['image_url'] = $data['image_url']->store('authors','public');
        }

        return $author->updateOrFail($data);
    }

    public static function hideAuthors(array $slugs): bool {
        return Author::whereIn('slug', $slugs)
            ->whereNull('deleted_at')
            ->delete();
    }
}
