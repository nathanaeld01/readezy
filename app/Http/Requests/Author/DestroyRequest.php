<?php

namespace App\Http\Requests\Author;

use Illuminate\Foundation\Http\FormRequest;

class DestroyRequest extends FormRequest {
	public function authorize(): bool {
		return true;
	}

	public function rules(): array {
		return [
			'ids' => 'required|array|min:1',
			'ids.*' => 'string|distinct|exists:authors,slug',
		];
	}

	public function messages() {
		return [
			'ids.min' => 'Please select at least one author to delete.',
			'ids.*.distinct' => 'Duplicate authors selected.',
			'ids.*.exists' => 'Author not found.',
		];
	}
}
