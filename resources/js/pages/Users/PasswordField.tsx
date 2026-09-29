import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { FormField, fieldClass } from '@/components/form-field';

interface PasswordFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    id?: string;
    required?: boolean;
}

export function PasswordField({
    label,
    value,
    onChange,
    error,
    placeholder,
    id,
    required = true,
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField label={label} error={error} required={required}>
            <div className="relative">
                <Lock className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className={`${fieldClass} pr-10 pl-9`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                        showPassword
                            ? 'Sembunyikan password'
                            : 'Tampilkan password'
                    }
                    title={
                        showPassword
                            ? 'Sembunyikan password'
                            : 'Tampilkan password'
                    }
                    className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-neutral-400 hover:text-neutral-700 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-200"
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>
        </FormField>
    );
}
