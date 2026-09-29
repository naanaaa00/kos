import { Link } from '@inertiajs/react';

export type FilterOption = {
    value: string | null;
    label: string;
};

/**
 * Deretan tombol filter berbentuk tab untuk memfilter data lewat query
 * string. Menggunakan link biasa agar filter ikut terbawa oleh link
 * pagination yang sudah di-generate server-side (`withQueryString`).
 */
export function FilterTabs({
    options,
    active,
    hrefFor,
}: {
    options: FilterOption[];
    active: string | null;
    hrefFor: (value: string | null) => string;
}) {
    return (
        <div
            role="group"
            aria-label="Filter data"
            className="flex w-fit gap-1 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-800 dark:bg-neutral-900"
        >
            {options.map((option) => {
                const isActive = option.value === active;

                return (
                    <Link
                        key={option.label}
                        href={hrefFor(option.value)}
                        preserveScroll
                        aria-current={isActive ? 'true' : undefined}
                        className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:bg-white/70 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/70 dark:hover:text-white'}`}
                    >
                        {option.label}
                    </Link>
                );
            })}
        </div>
    );
}
