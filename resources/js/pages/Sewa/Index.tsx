import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarDays, Home, Pencil, Plus, ReceiptText, UserRound } from 'lucide-react';
import { create, edit } from '@/routes/sewa';
import { index as tagihanIndex } from '@/routes/sewa/tagihan';
import { TransactionTabs } from '@/components/transaction-tabs';
import { ViewDialog } from '@/components/view-dialog';

interface Sewa {
    id: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    user: { name: string };
    room: { no_kamar: string };
}

const date = (value: string) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(value));

export default function Index({ sewas }: { sewas: Sewa[] }) {
    const { auth } = usePage().props;
    const permissions = auth.user?.permissions ?? [];
    const canCreate = permissions.includes('sewa.create');
    const canUpdate = permissions.includes('sewa.update');

    return (
        <>
            <Head title="Sewa" />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div><h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Transaksi</h1><p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Pilih sewa untuk melihat tagihan dan pembayarannya.</p></div>
                    {canCreate && <Link href={create()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"><Plus className="h-4 w-4" />Tambah Sewa</Link>}
                </div>
                <TransactionTabs active="sewa" />
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-neutral-200 text-left text-sm dark:divide-neutral-800"><thead className="bg-neutral-50/75 dark:bg-neutral-900"><tr><th className="px-6 py-3.5 font-semibold">Penghuni</th><th className="px-6 py-3.5 font-semibold">Kamar</th><th className="px-6 py-3.5 font-semibold">Periode</th><th className="px-6 py-3.5 text-right">Aksi</th></tr></thead><tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                    {sewas.map((sewa) => <tr key={sewa.id} className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"><td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">{sewa.user.name}</td><td className="whitespace-nowrap px-6 py-4 text-neutral-600 dark:text-neutral-400">{sewa.room.no_kamar}</td><td className="whitespace-nowrap px-6 py-4 text-neutral-600 dark:text-neutral-400">{date(sewa.tanggal_mulai)} - {date(sewa.tanggal_selesai)}</td><td className="whitespace-nowrap px-6 py-4 text-right"><div className="inline-flex items-center gap-3"><Link href={tagihanIndex(sewa.id)} className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" aria-label={`Lihat tagihan sewa ${sewa.id}`}><ReceiptText className="h-4 w-4" /></Link><ViewDialog title={`Detail Sewa #${sewa.id}`} description="Informasi penghuni, kamar, dan masa sewa." ariaLabel={`Lihat sewa ${sewa.id}`} sections={[{ title: 'Informasi Sewa', items: [{ icon: <UserRound className="h-4 w-4" />, label: 'Penghuni', value: sewa.user.name }, { icon: <Home className="h-4 w-4" />, label: 'Kamar', value: sewa.room.no_kamar }, { icon: <CalendarDays className="h-4 w-4" />, label: 'Mulai', value: date(sewa.tanggal_mulai) }, { label: 'Selesai', value: date(sewa.tanggal_selesai) }] }]} />{canUpdate && <Link href={edit(sewa.id)} className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" aria-label={`Edit sewa ${sewa.id}`}><Pencil className="h-4 w-4" /></Link>}</div></td></tr>)}
                </tbody></table></div></div>
            </div>
        </>
    );
}

Index.layout = { breadcrumbs: [{ title: 'Transaksi', href: '/sewa' }, { title: 'Sewa', href: '/sewa' }] };