import { Head, Link, router, usePage } from '@inertiajs/react';
import { Banknote, Pencil, Plus, Trash2 } from 'lucide-react';
import { create, destroy, edit } from '@/routes/sewa/tagihan';
import { index as pembayaranIndex } from '@/routes/tagihan/pembayaran';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TransactionTabs } from '@/components/transaction-tabs';
import { formatCurrency } from '@/lib/utils';

interface Sewa { id: number; user: { name: string }; room: { no_kamar: string } }
interface Tagihan { id: number; tanggal: string; jumlah: number; jatuh_tempo: string; status_tagihan: string; discount: number; denda: number; sewa_id: number; payment?: { id: number } | null }
const date = (value: string) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(value));
const money = formatCurrency;
const statusLabel: Record<string, string> = { belum_bayar: 'Belum Bayar', lunas: 'Lunas', lewat_tempo: 'Lewat Tempo' };

export default function Index({ sewa, tagihans }: { sewa: Sewa; tagihans: Tagihan[] }) {
    const { auth } = usePage().props;
    const permissions = auth.user?.permissions ?? [];
    const canCreate = permissions.includes('tagihan.create');
    const canUpdate = permissions.includes('tagihan.update');
    const canDelete = permissions.includes('tagihan.delete');
    const canViewPayments = permissions.includes('pembayaran.view');

    return <><Head title={`Tagihan - ${sewa.user.name}`} /><div className="space-y-6 p-4 sm:p-6 lg:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Tagihan</h1><p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{sewa.user.name} · Kamar {sewa.room.no_kamar}</p></div>{canCreate && <Link href={create(sewa.id)} className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"><Plus className="h-4 w-4" />Tambah Tagihan</Link>}</div><TransactionTabs active="tagihan" sewaId={sewa.id} /><div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-neutral-200 text-left text-sm dark:divide-neutral-800"><thead className="bg-neutral-50/75 dark:bg-neutral-900"><tr><th className="px-6 py-3.5 font-semibold">Tanggal</th><th className="px-6 py-3.5 font-semibold">Jatuh Tempo</th><th className="px-6 py-3.5 font-semibold">Jumlah</th><th className="px-6 py-3.5 font-semibold">Status</th><th className="px-6 py-3.5 text-right">Aksi</th></tr></thead><tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">{tagihans.map((tagihan) => <tr key={tagihan.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"><td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{date(tagihan.tanggal)}</td><td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{date(tagihan.jatuh_tempo)}</td><td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{money(tagihan.jumlah)}</td><td className="px-6 py-4"><span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium dark:bg-neutral-800">{statusLabel[tagihan.status_tagihan] ?? tagihan.status_tagihan}</span></td><td className="px-6 py-4 text-right"><div className="inline-flex items-center gap-3">{canViewPayments && <Link href={pembayaranIndex(tagihan.id)} className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" aria-label={`Lihat pembayaran tagihan ${tagihan.id}`}><Banknote className="h-4 w-4" /></Link>}{canUpdate && <Link href={edit({ sewa: sewa.id, tagihan: tagihan.id })} aria-label={`Edit tagihan ${tagihan.id}`}><Pencil className="h-4 w-4" /></Link>}{canDelete && <Dialog><DialogTrigger asChild><Button variant="ghost" size="icon" aria-label={`Hapus tagihan ${tagihan.id}`}><Trash2 className="h-4 w-4 text-red-600" /></Button></DialogTrigger><DialogContent><DialogTitle>Hapus tagihan?</DialogTitle><DialogDescription>Data tagihan ini akan dihapus.</DialogDescription><DialogFooter><DialogClose asChild><Button variant="outline">Batal</Button></DialogClose><Button variant="destructive" onClick={() => router.delete(destroy({ sewa: sewa.id, tagihan: tagihan.id }).url)}>Hapus</Button></DialogFooter></DialogContent></Dialog>}</div></td></tr>)}</tbody></table></div></div></div></>;
}

Index.layout = { breadcrumbs: [{ title: 'Transaksi', href: '/sewa' }, { title: 'Sewa', href: '/sewa' }, { title: 'Tagihan', href: '/sewa' }] };