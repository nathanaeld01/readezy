<?php

function image_url(string $publicId, ?string $transforms = null): string {
	return cloudinary()->getImage($publicId)->toUrl($transforms);
}

function image_upload(string $file, ?array $options = []) {
	if (empty($options['public_id']))
		throw new InvalidArgumentException("Options 'public_id' is required.");

	if (empty($options['folder']))
		throw new InvalidArgumentException("Options 'folder' is required.");

	if (!str_starts_with($options['folder'], 'readezy/')) {
		$options['folder'] = "readezy/" . $options['folder'];
	}

	$options = array_merge([
		"resource_type" => "image",
		"format" => "webp",
		"verify" => false,
		"invalidate" => true,
	], $options);

	return cloudinary()->upload($file, $options)->getPublicId() . ".{$options['format']}";
}

function convertToDate($inputDate) {
	$timestamp = strtotime($inputDate);	// Attempt to parse the date using strtotime

	if ($timestamp === false) 			// Check if strtotime returned a valid timestamp
		throw new InvalidArgumentException("Invalid date format");

	// Format the timestamp into the desired format
	return date('Y-m-d', $timestamp);
}
