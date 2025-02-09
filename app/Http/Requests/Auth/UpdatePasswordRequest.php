<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest {
	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, array<mixed>>
	 */
	public function rules(): array {
		return [
			'current_password' => [
				'required',
				'string',
				'current_password'
			],
			'new_password' => [
				'required',
				'string',
				'min:6',
				'confirmed'  // This will automatically check new_password_confirmation
			]
		];
	}

	/**
	 * Get custom validation messages.
	 *
	 * @return array<string, string>
	 */
	public function messages(): array {
		return [
			'current_password.required' => 'The current password field is required.',
			'current_password.string' => 'The current password must be a string.',
			'current_password.current_password' => 'Your current password is incorrect.',

			'new_password.required' => 'The new password field is required.',
			'new_password.string' => 'The new password must be a string.',
			'new_password.min' => 'The new password must be at least 6 characters.',
			'new_password.confirmed' => 'The password confirmation does not match.'
		];
	}

	/**
	 * Get custom attributes for validator errors.
	 *
	 * @return array<string, string>
	 */
	public function attributes(): array {
		return [
			'current_password' => 'current password',
			'new_password' => 'new password'
		];
	}

	/**
	 * Prepare the data for validation.
	 */
	protected function prepareForValidation(): void {
		$this->merge([
			'new_password_confirmation' => $this->confirm_password
		]);
	}
}
