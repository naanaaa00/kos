import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit3, Home, Plus, Trash2, Wifi, X } from 'lucide-react';
import { create, destroy, edit } from '@/routes/kamar';
import { ViewDialog } from '@/components/view-dialog';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface Kamar {
    id: number;
    no_kamar: string;
    harga: number;
    fasilitas: string;
    ketersediaan: boolean;
}

export default function Index({ kamars }: { kamars: Kamar[] }) {
    const { auth } = usePage().props;
    const permissions = auth.user?.permissions ?? [];
    const canCreate = permissions.includes('kamar.create');
    const canUpdate = permissions.includes('kamar.update');
    const canDelete = permissions.includes('kamar.delete');

    return (
        <>
            <Head title="Kamar" />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Kamar</h1>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Daftar kamar dan informasi ketersediaannya.</p>
                    </div>
                    {canCreate && <Link href={create()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200">
                        <Plus className="h-4 w-4" />Tambah Kamar
                    </Link>}
                </div>

                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200 text-left text-sm dark:divide-neutral-800">
                            <thead className="bg-neutral-50/75 dark:bg-neutral-900">
                                <tr>
                                    <th className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">No. Kamar</th>
                                    <th className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">Harga</th>
                                    <th className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">Status</th>
                                    <th className="relative px-6 py-3.5 text-right"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                                {kamars.map((kamar) => (
                                    <tr key={kamar.id} className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">{kamar.no_kamar}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-neutral-600 dark:text-neutral-400">{formatCurrency(kamar.harga)}</td>
                                        <td className="px-6 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${kamar.ketersediaan ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'}`}>{kamar.ketersediaan ? 'Tersedia' : 'Terisi'}</span></td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <div className="inline-flex items-center gap-3">
                                                <ViewDialog
                                                    title={`Data Kamar ${kamar.no_kamar}`}
                                                    description="Informasi harga, fasilitas, dan status kamar."
                                                    ariaLabel={`Lihat kamar ${kamar.no_kamar}`}
                                                    sections={[{ title: 'Informasi Kamar', items: [
                                                        { icon: <Home className="h-4 w-4" />, label: 'Nomor Kamar', value: kamar.no_kamar },
                                                        { label: 'Harga per Bulan', value: formatCurrency(kamar.harga) },
                                                        { icon: <Wifi className="h-4 w-4" />, label: 'Fasilitas', value: kamar.fasilitas },
                                                        { label: 'Status', value: kamar.ketersediaan ? 'Tersedia' : 'Terisi' },
                                                    ] }]}
                                                />
                                                {canUpdate && <Link href={edit(kamar.id)} aria-label={`Edit kamar ${kamar.no_kamar}`} title={`Edit kamar ${kamar.no_kamar}`} className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"><Edit3 className="h-4 w-4" /></Link>}
                                                {canDelete && <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button type="button" variant="ghost" size="icon" aria-label={`Hapus kamar ${kamar.no_kamar}`} title={`Hapus kamar ${kamar.no_kamar}`} className="text-rose-600 hover:bg-rose-50 hover:text-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-300"><Trash2 className="h-4 w-4" /></Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle>Hapus kamar {kamar.no_kamar}?</DialogTitle>
                                                        <DialogDescription>Data kamar ini akan dihapus secara permanen dan tidak dapat dipulihkan.</DialogDescription>
                                                        <DialogFooter className="gap-2">
                                                            <DialogClose asChild><Button type="button" variant="secondary"><X className="h-4 w-4" />Batal</Button></DialogClose>
                                                            <DialogClose asChild><Button type="button" variant="destructive" onClick={() => router.delete(destroy(kamar.id).url)}><Trash2 className="h-4 w-4" />Hapus Kamar</Button></DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = { breadcrumbs: [{ title: 'Kamar', href: '/kamar' }] };
