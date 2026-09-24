import type { ReactNode } from 'react';
import { digitsOnly } from '@/lib/utils';

const fieldClass = 'mt-1.5 block w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400';

export { fieldClass };

export function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {label} <span className="text-rose-500">*</span>
            </label>
            {children}
            {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}
        </div>
    );
}

export function CurrencyInput({ value, onChange, readOnly = false }: { value: string | number; onChange?: (value: string) => void; readOnly?: boolean }) {
    const rawValue = digitsOnly(String(value));
    const displayValue = rawValue === '' ? '' : new Intl.NumberFormat('id-ID').format(Number(rawValue));

    return (
        <div className="relative mt-1.5">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-neutral-500 dark:text-neutral-400">Rp</span>
            <input
                type="text"
                inputMode="numeric"
                value={displayValue}
                readOnly={readOnly}
                onFocus={(event) => {
                    if (rawValue === '0') {
                        event.currentTarget.select();
                    }
                }}
                onChange={(event) => onChange?.(digitsOnly(event.target.value))}
                className={`${fieldClass} pl-10`}
            />
        </div>
    );
}