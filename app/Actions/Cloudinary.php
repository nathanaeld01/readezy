<?php

namespace App\Actions;

class Cloudinary {
	protected static $transforms = [
		'avatar' => [
			'crop' => 'thumb',
			'gravity' => 'auto',
			'aspect_ratio' => '1:1',
			'zoom' => 0.6,
			'width' => 300,
		],
		'author' => [
			[
				"crop" => "crop",
				"gravity" => "face",
				"aspect_ratio" => "5:7",
				"zoom" => 0.6,
			],
			[
				"width" => 300,
				"height" => 420,
				"crop" => "scale",
			],
		],
		'book' => [
			"width" => 300,
			"crop" => "scale",
		],
	];

	/**
	 * Uploads a file to Cloudinary with the specified options.
	 *
	 * @param string $file The path to the file to be uploaded.
	 * @param array|null $options An associative array of options for the upload.
	 *  - 'public_id' (string): The public ID for the uploaded file (required).
	 *  - 'folder' (string): The folder path where the file will be stored (required).
	 *  - 'resource_type' (string): The type of resource (default: 'image').
	 *  - 'format' (string): The format of the uploaded file (default: 'webp').
	 *  - 'verify' (bool): Whether to verify the upload (default: false).
	 *  - 'invalidate' (bool): Whether to invalidate the cache (default: true).
	 *  - 'transformation' (string): The transformation preset to apply (optional).
	 *
	 * @return string The public ID of the uploaded file with the specified format.
	 *
	 * @throws \InvalidArgumentException If 'public_id' or 'folder' options are not provided.
	 */
	public static function upload(string $file, ?array $options = []): string {
		if (empty($options['folder']))
			throw new \InvalidArgumentException("Options 'folder' is required.");

		if (!str_starts_with($options['folder'], 'readezy/')) {
			$options['folder'] = "readezy/" . $options['folder'];
		}

		if (isset($options['transformation'])) {
			if (!array_key_exists($options['transformation'], self::$transforms))
				throw new \InvalidArgumentException("Invalid transformation preset.");

			$options['transformation'] = self::$transforms[$options['transformation']];
		}

		$options = array_merge([
			"resource_type" => "image",
			"format" => "webp",
			"verify" => false,
			"invalidate" => true,
		], $options);

		return cloudinary()->upload($file, $options)->getPublicId() . "." . $options['format'];
	}

	public static function image(string $publicId, ?string $transforms = null): string {
		return cloudinary()->getImage($publicId)->toUrl($transforms);
	}

	public static function public_id(string $path): string {
		if (empty($path)) {
			throw new \InvalidArgumentException("Path is required.");
		}

		return basename($path, '.webp');
	}
}
