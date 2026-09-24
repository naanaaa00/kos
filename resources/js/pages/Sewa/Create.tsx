import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2, Save, X } from 'lucide-react';
import { index, store } from '@/routes/sewa';
import { fieldClass, FormField } from '@/components/form-field';
import { TransactionFormShell } from '@/components/transaction-form-shell';
import { formatCurrency } from '@/lib/utils';

interface Option { id: number; name?: string; no_kamar?: string; harga?: number; }

export default function Create({ users, kamars }: { users: Option[]; kamars: Option[] }) {
    const { data, setData, post, processing, errors } = useForm({ tanggal_mulai: '', tanggal_selesai: '', user_id: '', kamar_id: '' });
    const submit: FormEventHandler = (event) => { event.preventDefault(); post(store.url()); };

    return <TransactionFormShell title="Tambah Sewa" description="Catat periode sewa baru untuk penghuni." active="sewa"><form onSubmit={submit} className="space-y-6 p-6"><div className="grid grid-cols-1 gap-5 md:grid-cols-2"><FormField label="Penghuni" error={errors.user_id}><select value={data.user_id} onChange={(event) => setData('user_id', event.target.value)} className={fieldClass}><option value="">Pilih penghuni</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select></FormField><FormField label="Kamar" error={errors.kamar_id}><select value={data.kamar_id} onChange={(event) => setData('kamar_id', event.target.value)} className={fieldClass}><option value="">Pilih kamar</option>{kamars.map((kamar) => <option key={kamar.id} value={kamar.id}>{kamar.no_kamar} {kamar.harga ? `- ${formatCurrency(kamar.harga)}` : ''}</option>)}</select></FormField><FormField label="Tanggal Mulai" error={errors.tanggal_mulai}><input type="date" value={data.tanggal_mulai} onChange={(event) => setData('tanggal_mulai', event.target.value)} className={fieldClass} /></FormField><FormField label="Tanggal Selesai" error={errors.tanggal_selesai}><input type="date" value={data.tanggal_selesai} onChange={(event) => setData('tanggal_selesai', event.target.value)} className={fieldClass} /></FormField></div><Actions processing={processing} /></form></TransactionFormShell>;
}

function Actions({ processing }: { processing: boolean }) { return <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800"><Link href={index()} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"><X className="h-4 w-4" />Batal</Link><button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900">{processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Simpan Sewa</button></div>; }

Create.layout = { breadcrumbs: [{ title: 'Transaksi', href: '/sewa' }, { title: 'Sewa', href: '/sewa' }] };