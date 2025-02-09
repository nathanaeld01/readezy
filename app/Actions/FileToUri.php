<?php

namespace App\Actions;

use Illuminate\Http\UploadedFile;

class FileToUri {
	/**
	 * Convert a file to a base64 data URI
	 * 
	 * @param string|UploadedFile $file
	 * @return string
	 */
	public static function convert($file): string {
		if ($file instanceof UploadedFile) {
			$path = $file->getRealPath();
			$mimeType = $file->getMimeType();
		} else {
			$path = $file;
			$mimeType = mime_content_type($path);
		}

		if (!is_readable($path)) {
			throw new \RuntimeException("File is not readable: {$path}");
		}

		$content = file_get_contents($path);
		if ($content === false) {
			throw new \RuntimeException("Failed to read file content");
		}

		return "data:{$mimeType};base64," . base64_encode($content);
	}
}
