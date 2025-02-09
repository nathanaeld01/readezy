<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest {
	public function authorize(): bool {
		return true;
	}

	public function rules(): array {
		return [
			'avatar' => [
				'sometimes',
				'image',
				'mimes:jpeg,png,jpg,gif,svg',
				'max:2048'  // 2MB
			],
			'name' => [
				'sometimes',
				'string',
				'max:255',
				Rule::notIn([$this->user()->name])  // Cannot be the same as current name
			],
			'email' => [
				'sometimes',
				'string',
				'email',
				'max:255',
				Rule::notIn([$this->user()->email]),  // Cannot be the same as current email
				Rule::unique('users')->ignore($this->user()->id)  // Must be unique except for current user
			]
		];
	}

	public function messages(): array {
		return [
			'avatar.image' => 'The avatar must be an image.',
			'avatar.mimes' => 'The avatar must be a file of type: jpeg, png, jpg, gif, svg.',
			'avatar.max' => 'The avatar must not be greater than 2MB.',
			'name.not_in' => 'The new name must be different from your current name.',
			'email.not_in' => 'The new email must be different from your current email.',
			'email.unique' => 'This email is already taken by another user.'
		];
	}
}
