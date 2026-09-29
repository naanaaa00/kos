import type { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
            <div>
                <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {description}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}

export function BackToIndexButton({
    href,
}: {
    href: NonNullable<import('@inertiajs/react').InertiaLinkProps['href']>;
}) {
    return (
        <Link
            href={href}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar
        </Link>
    );
}
