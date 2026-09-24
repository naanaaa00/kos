import type { FormEventHandler } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Loader2, Save, X } from 'lucide-react';
import { index, store } from '@/routes/tagihan/pembayaran';
import { fieldClass, FormField } from '@/components/form-field';
import { TransactionFormShell } from '@/components/transaction-form-shell';
import { formatCurrency } from '@/lib/utils';

interface Tagihan { id: number; jumlah: number; sewa: { user: { name: string }; room: { no_kamar: string } } }
export default function Create({ tagihan }: { tagihan: Tagihan }) {
    const { data, setData, post, processing, errors } = useForm({ jumlah: String(tagihan.jumlah), tanggal_pembayaran: '', metode_pembayaran: 'Cash' });
    const submit: FormEventHandler = (event) => { event.preventDefault(); post(store(tagihan.id).url); };
    return <TransactionFormShell title="Tambah Pembayaran" description={`Catat pembayaran ${formatCurrency(tagihan.jumlah)} untuk tagihan #${tagihan.id}.`} active="pembayaran" tagihanId={tagihan.id}><form onSubmit={submit} className="space-y-6 p-6"><PaymentFields data={data} setData={setData} errors={errors} /><Actions href={index(tagihan.id).url} processing={processing} /></form></TransactionFormShell>;
}
function PaymentFields({ data, setData, errors }: { data: Record<string, string>; setData: (key: string, value: string) => void; errors: Record<string, string> }) { return <div className="grid grid-cols-1 gap-5 md:grid-cols-2"><FormField label="Metode Pembayaran" error={errors.metode_pembayaran}><select value={data.metode_pembayaran} onChange={(event) => setData('metode_pembayaran', event.target.value)} className={fieldClass}><option value="Cash">Cash</option><option value="Bank">Bank</option></select></FormField><FormField label="Jumlah Tagihan (Rp)" error={errors.jumlah}><input type="number" min="0" value={data.jumlah} readOnly className={fieldClass} /></FormField><FormField label="Tanggal Pembayaran" error={errors.tanggal_pembayaran}><input type="datetime-local" value={data.tanggal_pembayaran} onChange={(event) => setData('tanggal_pembayaran', event.target.value)} className={fieldClass} /></FormField></div>; }
function Actions({ href, processing }: { href: string; processing: boolean }) { return <div className="flex justify-end gap-3 border-t border-neutral-200 pt-5"><Link href={href} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm"><X className="h-4 w-4" />Batal</Link><button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm text-white disabled:opacity-50">{processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Simpan</button></div>; }
Create.layout = { breadcrumbs: [{ title: 'Transaksi', href: '/sewa' }, { title: 'Pembayaran', href: '/sewa' }] };