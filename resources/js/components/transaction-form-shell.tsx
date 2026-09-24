import type { ReactNode } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { index as sewaIndex } from '@/routes/sewa';
import { index as tagihanIndex } from '@/routes/sewa/tagihan';
import { index as pembayaranIndex } from '@/routes/tagihan/pembayaran';

export function TransactionFormShell({ title, description, active, sewaId, tagihanId, children }: { title: string; description: string; active: 'sewa' | 'tagihan' | 'pembayaran'; sewaId?: number; tagihanId?: number; children: ReactNode }) {
    const index = active === 'sewa' ? sewaIndex : active === 'tagihan' ? () => tagihanIndex(sewaId as number) : () => pembayaranIndex(tagihanId as number);

    return (
        <>
            <Head title={title} />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h1>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
                    </div>
                    <Link href={index()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        <ArrowLeft className="h-4 w-4" />Kembali ke Daftar
                    </Link>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">{children}</div>
            </div>
        </>
    );
}