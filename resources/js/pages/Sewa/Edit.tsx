import { FormEventHandler } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Loader2, Save, X } from 'lucide-react';
import { index, update } from '@/routes/sewa';
import { fieldClass, FormField } from '@/components/form-field';
import { TransactionFormShell } from '@/components/transaction-form-shell';

interface Option { id: number; name?: string; no_kamar?: string; harga?: number; }
interface Sewa { id: number; tanggal_mulai: string; tanggal_selesai: string; user_id: number; kamar_id: number; }

function dateValue(value: string) { return value.slice(0, 10); }

export default function Edit({ sewa, users, kamars }: { sewa: Sewa; users: Option[]; kamars: Option[] }) {
    const { data, setData, put, processing, errors } = useForm({ tanggal_mulai: dateValue(sewa.tanggal_mulai), tanggal_selesai: dateValue(sewa.tanggal_selesai), user_id: String(sewa.user_id), kamar_id: String(sewa.kamar_id) });
    const submit: FormEventHandler = (event) => { event.preventDefault(); put(update(sewa.id).url); };

    return <TransactionFormShell title="Edit Sewa" description={`Perbarui periode sewa #${sewa.id}.`} active="sewa"><form onSubmit={submit} className="space-y-6 p-6"><div className="grid grid-cols-1 gap-5 md:grid-cols-2"><FormField label="Penghuni" error={errors.user_id}><select value={data.user_id} onChange={(event) => setData('user_id', event.target.value)} className={fieldClass}>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select></FormField><FormField label="Kamar" error={errors.kamar_id}><select value={data.kamar_id} onChange={(event) => setData('kamar_id', event.target.value)} className={fieldClass}>{kamars.map((kamar) => <option key={kamar.id} value={kamar.id}>{kamar.no_kamar}</option>)}</select></FormField><FormField label="Tanggal Mulai" error={errors.tanggal_mulai}><input type="date" value={data.tanggal_mulai} onChange={(event) => setData('tanggal_mulai', event.target.value)} className={fieldClass} /></FormField><FormField label="Tanggal Selesai" error={errors.tanggal_selesai}><input type="date" value={data.tanggal_selesai} onChange={(event) => setData('tanggal_selesai', event.target.value)} className={fieldClass} /></FormField></div><div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800"><Link href={index()} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"><X className="h-4 w-4" />Batal</Link><button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900">{processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Simpan Perubahan</button></div></form></TransactionFormShell>;
}

Edit.layout = { breadcrumbs: [{ title: 'Transaksi', href: '/sewa' }, { title: 'Sewa', href: '/sewa' }] };