import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

/**
 * Bentuk prop hasil `->paginate()` Laravel seperti yang diserialisasi Inertia.
 */
export interface Paginator<T> {
    data: T[];
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginatorLink[];
    per_page: number;
    to: number | null;
    total: number;
}

const navButtonClass =
    'inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg border px-2 text-sm font-medium transition-colors';
const enabledClass =
    'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white';
const activeClass =
    'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900';
const disabledClass = 'border-transparent text-neutral-300 dark:text-neutral-700';

export function Pagination<T>({ paginator }: { paginator: Paginator<T> }) {
    if (paginator.total === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 border-t border-neutral-200 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Menampilkan{' '}
                <span className="font-medium text-neutral-900 dark:text-neutral-200">
                    {paginator.from}
                </span>
                –
                <span className="font-medium text-neutral-900 dark:text-neutral-200">
                    {paginator.to}
                </span>{' '}
                dari{' '}
                <span className="font-medium text-neutral-900 dark:text-neutral-200">
                    {paginator.total}
                </span>{' '}
                data
            </p>
            <nav className="flex items-center gap-1" aria-label="Pagination">
                {paginator.links.map((link, index) => {
                    const isPrevious = index === 0;
                    const isNext = index === paginator.links.length - 1;

                    if (isPrevious || isNext) {
                        const className = [
                            navButtonClass,
                            link.url ? enabledClass : disabledClass,
                        ].join(' ');
                        const icon = isPrevious ? (
                            <ChevronLeft className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        );

                        return link.url ? (
                            <Link
                                key={link.label}
                                href={link.url}
                                preserveScroll
                                className={className}
                                aria-label={
                                    isPrevious
                                        ? 'Halaman sebelumnya'
                                        : 'Halaman berikutnya'
                                }
                            >
                                {icon}
                            </Link>
                        ) : (
                            <span
                                key={link.label}
                                className={`${className} cursor-not-allowed`}
                                aria-disabled="true"
                            >
                                {icon}
                            </span>
                        );
                    }

                    if (link.url === null) {
                        return (
                            <span
                                key={link.label + index}
                                className="inline-flex h-8 min-w-8 items-center justify-center text-sm text-neutral-400 dark:text-neutral-600"
                            >
                                {link.label}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={link.label}
                            href={link.url}
                            preserveScroll
                            className={`${navButtonClass} ${link.active ? activeClass : enabledClass}`}
                            aria-current={link.active ? 'page' : undefined}
                            aria-label={`Ke halaman ${link.label}`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
