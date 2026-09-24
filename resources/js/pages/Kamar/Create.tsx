import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Home, Loader2, Save, Wifi, X } from 'lucide-react';
import { index, store } from '@/routes/kamar';
import { CurrencyInput } from '@/components/form-field';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({ no_kamar: '', harga: '', fasilitas: '', ketersediaan: true });
    const submit: FormEventHandler = (event) => { event.preventDefault(); post(store.url()); };
    const fieldClass = 'mt-1.5 block w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400';

    return <><Head title="Tambah Kamar" /><div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800"><div><h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Tambah Kamar Baru</h1><p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Lengkapi informasi kamar untuk menambah data baru.</p></div><Link href={index()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"><ArrowLeft className="h-4 w-4" />Kembali ke Daftar</Link></div>
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"><form onSubmit={submit} className="space-y-6 p-6"><div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Nomor Kamar" error={errors.no_kamar}><div className="relative"><Home className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400" /><input id="no_kamar" value={data.no_kamar} onChange={(event) => setData('no_kamar', event.target.value)} placeholder="cth. A-01" className={`${fieldClass} pl-9`} /></div></Field>
            <Field label="Harga per Bulan (Rp)" error={errors.harga}><CurrencyInput value={data.harga} onChange={(value) => setData('harga', value)} /></Field>
        </div><Field label="Fasilitas" error={errors.fasilitas}><div className="relative"><Wifi className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400" /><textarea id="fasilitas" rows={4} value={data.fasilitas} onChange={(event) => setData('fasilitas', event.target.value)} placeholder="cth. Wi-Fi, kamar mandi dalam, lemari" className={`${fieldClass} pl-9`} /></div></Field>
        <label className="flex items-center gap-3 text-sm font-medium text-neutral-700 dark:text-neutral-300"><input type="checkbox" checked={data.ketersediaan} onChange={(event) => setData('ketersediaan', event.target.checked)} className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900" />Kamar tersedia untuk disewa</label>
        <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800"><Link href={index()} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"><X className="h-4 w-4" />Batal</Link><button type="submit" disabled={processing} className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white shadow transition-all hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">{processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Simpan Kamar</button></div>
        </form></div>
    </div></>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return <div><label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{label} <span className="text-rose-500">*</span></label>{children}{error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}</div>;
}

Create.layout = { breadcrumbs: [{ title: 'Kamar', href: '/kamar' }] };