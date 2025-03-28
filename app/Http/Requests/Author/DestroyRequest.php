<?php

namespace App\Http\Requests\Author;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class DestroyRequest extends FormRequest {
    public function rules(): array {
        return [
            'slugs' => 'required|array|min:1|unique_array',
            'slugs.*' => 'required|string|regex:/^[a-z-]+$/|exists:authors,slug'
        ];
    }

    public function messages(): array {
        return [
            'slugs.required' => 'At least one author slug is required.',
            'slugs.array' => 'Slugs must be provided as an array.',
            'slugs.min' => 'At least one author slug must be specified.',
            'slugs.unique_array' => 'The slugs array contains duplicate values.',
            'slugs.*.required' => 'Each slug must be a non-empty value.',
            'slugs.*.string' => 'Each slug must be a valid string.',
            'slugs.*.regex' => 'Slugs can only contain lowercase letters and hyphens (-).',
            'slugs.*.exists' => ':input does not exist in the database'
        ];
    }

    protected function prepareForValidation() {
        Validator::extend('unique_array', function ($attribute, $value) {
            return count($value) === count(array_unique($value));
        });
    }
}
