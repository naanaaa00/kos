import { Link, usePage } from '@inertiajs/react';
import { Banknote, ClipboardList, ReceiptText } from 'lucide-react';
import { index as sewaIndex } from '@/routes/sewa';
import { index as tagihanIndex } from '@/routes/sewa/tagihan';
import { index as pembayaranIndex } from '@/routes/tagihan/pembayaran';

export function TransactionTabs({ active, sewaId, tagihanId }: { active: 'sewa' | 'tagihan' | 'pembayaran'; sewaId?: number; tagihanId?: number }) {
    const { auth } = usePage().props;
    const permissions = auth.user?.permissions ?? [];
    const tabs = [
        { label: 'Sewa', href: sewaIndex(), icon: ClipboardList, visible: permissions.includes('sewa.view') },
        { label: 'Tagihan', href: sewaId === undefined ? sewaIndex() : tagihanIndex(sewaId), icon: ReceiptText, visible: sewaId !== undefined && permissions.includes('tagihan.view') },
        { label: 'Pembayaran', href: tagihanId === undefined ? sewaIndex() : pembayaranIndex(tagihanId), icon: Banknote, visible: tagihanId !== undefined && permissions.includes('pembayaran.view') },
    ];

    return (
        <nav className="flex gap-1 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-800 dark:bg-neutral-900" aria-label="Modul transaksi">
            {tabs.filter((tab) => tab.visible).map((tab) => {
                const isActive = tab.label.toLowerCase() === active;
                const Icon = tab.icon;

                return (
                    <Link key={tab.label} href={tab.href} className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:bg-white/70 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/70 dark:hover:text-white'}`}>
                        <Icon className="h-4 w-4" />
                        {tab.label}
                    </Link>
                );
            })}
        </nav>
    );
}