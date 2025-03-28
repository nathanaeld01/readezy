<?php

namespace App\Http\Requests\Author;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest {
    public function rules(): array {
        return [
            'title' => 'required|string|between:3,255',
            'description' => 'required|array|min:1',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp',
            'date_of_birth' => 'required|date|before:today',
            'date_of_death' => 'nullable|date|after:date_of_birth|before:today',
            'nationality' => 'required|string|max:100',
            'website_url' => 'nullable|url|max:255',
        ];
    }

    public function messages(): array {
        return [
            'title.required' => 'Please provide a name.',
            'title.between' => 'The name must be between :min and :max characters long.',

            'description.required' => 'At least one description paragraph is required.',
            'description.array' => 'Description must be provided as paragraphs.',
            'description.min' => 'Please provide at least :min paragraph.',

            'image.required' => 'Please upload an image.',
            'image.image' => 'The uploaded file must be a valid image.',
            'image.mBios' => 'Only JPG, JPEG, PNG, and WEBP formats are supported.',

            'date_of_birth.required' => 'Please provide a date of birth.',
            'date_of_birth.date' => 'Please provide a valid date of birth.',
            'date_of_birth.before' => 'Date of birth must be in the past.',

            'date_of_death.date' => 'Please provide a valid date of death.',
            'date_of_death.after' => 'Date of death must be after date of birth.',
            'date_of_death.before' => 'Date of death must be in the past.',

            'nationality.required' => 'Please provide a nationality.',
            'nationality.max' => 'Nationality cannot exceed :max characters.',

            'website_url.url' => 'Please provide a valid URL.',
            'website_url.max' => 'Website URL cannot exceed :max characters.',
        ];
    }

    protected function prepareForValidation(): void {
        $this->merge([
            'description' => explode("\n", $this->input('description')),
        ]);
    }
}
