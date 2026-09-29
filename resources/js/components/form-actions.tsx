import { Link } from '@inertiajs/react';
import { Loader2, Save, X } from 'lucide-react';

interface FormActionsProps {
    cancelHref: NonNullable<
        import('@inertiajs/react').InertiaLinkProps['href']
    >;
    label: string;
    processing: boolean;
}

export function FormActions({
    cancelHref,
    label,
    processing,
}: FormActionsProps) {
    return (
        <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800">
            <Link
                href={cancelHref}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
                <X className="h-4 w-4" />
                Batal
            </Link>
            <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white shadow transition-all hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
                {processing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Save className="h-4 w-4" />
                )}
                {label}
            </button>
        </div>
    );
}
