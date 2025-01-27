<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'series_id' => 'nullable|required_without:author_id',
            'author_id' => 'nullable|required_without:series_id',
        ];
    }

    public function messages(): array {
        return [
            'series_id.required_without' => 'A book cannot have both a series and an author',
            'author_id.required_without' => 'A book cannot have both a series and an author',
        ];
    }
}
