<?php

namespace App\Http\Requests\Author;

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
            'author_name' => 'required',
            'author_image' => 'required',
            'author_description' => 'required',
        ];
    }

    public function prepareForValidation(): void {
        // transform each paragraph from author description to array and serialize it
        $this->merge([
            'author_description' => serialize(explode("\n", $this->author_description)),
        ]);
    }
}
