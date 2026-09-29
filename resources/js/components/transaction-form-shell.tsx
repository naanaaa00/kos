import type { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { PageHeader, BackToIndexButton } from '@/components/page-header';
import { index as sewaIndex } from '@/routes/sewa';
import { index as tagihanIndex } from '@/routes/sewa/tagihan';
import { index as pembayaranIndex } from '@/routes/tagihan/pembayaran';

interface TransactionFormShellProps {
    title: string;
    description: string;
    active: 'sewa' | 'tagihan' | 'pembayaran';
    sewaId?: number;
    tagihanId?: number;
    children: ReactNode;
}

export function TransactionFormShell({
    title,
    description,
    active,
    sewaId,
    tagihanId,
    children,
}: TransactionFormShellProps) {
    const backHref =
        active === 'sewa'
            ? sewaIndex
            : active === 'tagihan'
              ? () => tagihanIndex(sewaId as number)
              : () => pembayaranIndex(tagihanId as number);

    return (
        <>
            <Head title={title} />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title={title}
                    description={description}
                    action={<BackToIndexButton href={backHref()} />}
                />
                <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
                    {children}
                </div>
            </div>
        </>
    );
}
