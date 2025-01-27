<?php

namespace App;

class Constants {
	public static function authorTransforms() {
		return [
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
		];
	}

	public static function bookTransforms() {
		return  [
			"width" => 300,
			"crop" => "scale",
		];
	}
}
