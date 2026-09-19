<?php

namespace App\Concerns;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

trait ProfileValidationRules
{
    /**
     * Get the validation rules used to validate user profiles.
     *
     * @return array<string, array<int, ValidationRule|array<mixed>|string>>
     */
    protected function profileRules(?int $userId = null): array
    {
        return [
            'name' => $this->nameRules(),
            'no_hp' => $this->phoneRules($userId),
        ];
    }

    /**
     * Get the validation rules used to validate user names.
     *
     * @return array<int, ValidationRule|array<mixed>|string>
     */
    protected function nameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    /**
     * Get the validation rules used to validate user phone numbers.
     *
     * @return array<int, ValidationRule|array<mixed>|string>
     */
    protected function phoneRules(?int $userId = null): array
    {
        return [
            'required',
            'numeric',
            'digits_between:10,15',
            $userId === null
                ? Rule::unique(User::class, 'no_hp')
                : Rule::unique(User::class, 'no_hp')->ignore($userId),
        ];
    }
}
