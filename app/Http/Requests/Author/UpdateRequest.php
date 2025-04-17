<?php

namespace App\Http\Requests\Author;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class UpdateRequest extends FormRequest {
    public function rules(): array {
        return [
            'title' => 'sometimes|string|between:3,255',
            'description' => 'sometimes|array|min:1',
            'image_url' => 'sometimes|image|mimes:jpg,jpeg,png,webp',
            'date_of_birth' => 'sometimes|date|before:today',
            'date_of_death' => 'sometimes|date|after:date_of_birth|before:today',
            'nationality' => 'sometimes|string|max:100',
            'website_url' => 'sometimes|url|max:255',
        ];
    }

    public function messages(): array {
        return [
            'title.between' => 'The name must be between :min and :max characters long.',
            'title.string' => 'The name must be a valid string.',

            'description.array' => 'Description must be provided as paragraphs.',
            'description.min' => 'Please provide at least :min paragraph.',

            'image_url.image' => 'The uploaded file must be a valid image.',
            'image_url.mimes' => 'Only JPG, JPEG, PNG, and WEBP formats are supported.',

            'date_of_birth.date' => 'Please provide a valid date of birth.',
            'date_of_birth.before' => 'Date of birth must be in the past.',

            'date_of_death.date' => 'Please provide a valid date of death.',
            'date_of_death.after' => 'Date of death must be after date of birth.',
            'date_of_death.before' => 'Date of death must be in the past.',

            'nationality.string' => 'Nationality must be a valid string.',
            'nationality.max' => 'Nationality cannot exceed :max characters.',

            'website_url.url' => 'Please provide a valid URL.',
            'website_url.max' => 'Website URL cannot exceed :max characters.',
        ];
    }

    protected function prepareForValidation(): void {
        if ($this->has('description') && is_string($this->input('description'))) {
            $this->merge([
                'description' => explode("\r\n\r\n", $this->input('description')),
            ]);
        }
    }

    protected function failedValidation(Validator $validator): void {
        throw new ValidationException(
            $validator,
            response()->json($validator->errors()->first(), 422)
        );
    }
}
