import { FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, ArrowLeft, User, Phone, Lock, Loader2, Save, ShieldCheck, Info, ClipboardCheck, X } from 'lucide-react';
import { index, store } from '@/routes/users';

export default function Create() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        no_hp: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <>
            <Head title="Create User" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-5 dark:border-neutral-800">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Tambah User Baru
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            Lengkapi informasi akun di bawah ini untuk menambahkan pengguna baru.
                        </p>
                    </div>

                    <div>
                        <Link
                            href={index()}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Kembali ke Daftar</span>
                        </Link>
                    </div>
                </div>

                {/* Grid Layout: Sisi Kiri (Form) & Sisi Kanan (Side Info / Tips) */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Kolom Kiri: Form Input (Mengambil 2 porsi layar) */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 backdrop-blur">
                            <form onSubmit={submit} className="p-6 space-y-5">
                                {/* Field Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Nama Lengkap <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative mt-1.5">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="cth. Waridatul Jannah"
                                            className="block w-full rounded-lg border border-neutral-300 bg-transparent pl-9 pr-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>
                                    )}
                                </div>

                                {/* Field No Handphone */}
                                <div>
                                    <label
                                        htmlFor="no_hp"
                                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        No. Handphone <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative mt-1.5">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <input
                                            id="no_hp"
                                            type="tel"
                                            value={data.no_hp}
                                            onChange={(e) => {
                                                const sanitized = e.target.value.replace(/\D/g, '');
                                                setData('no_hp', sanitized);
                                            }}
                                            placeholder="cth. 08123456789"
                                            maxLength={15}
                                            className="block w-full rounded-lg border border-neutral-300 bg-transparent pl-9 pr-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400"
                                        />
                                    </div>
                                    {errors.no_hp && (
                                        <p className="mt-1.5 text-xs text-rose-500">{errors.no_hp}</p>
                                    )}
                                </div>

                                {/* Field Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Password <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative mt-1.5">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                                            <Lock className="h-4 w-4" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Minimal 8 karakter"
                                            className="block w-full rounded-lg border border-neutral-300 bg-transparent pl-9 pr-10 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((visible) => !visible)}
                                            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                            title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                            className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-neutral-400 hover:text-neutral-700 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-200"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-rose-500">{errors.password}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-3 border-t border-neutral-150 pt-5 dark:border-neutral-800">
                                    <Link
                                        href={index()}
                                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                                    >
                                        <X className="h-4 w-4" />Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white shadow transition-all hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                                    >
                                        {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                        <span>{processing ? 'Menyimpan...' : 'Simpan User'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Kolom Kanan: Card Bantuan & Keamanan (Mengisi ruang yang kosong) */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/40">
                            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                <h3>Ketentuan Akun</h3>
                            </div>
                            <ul className="mt-3 space-y-2 text-xs text-neutral-500 dark:text-neutral-400 list-disc list-inside">
                                <li>Nomor HP harus berupa angka aktif.</li>
                                <li>Password dianjurkan minimal 8 karakter dengan kombinasi huruf dan angka.</li>
                                <li>Akun yang dibuat akan langsung aktif di dalam sistem.</li>
                            </ul>
                        </div>

                        <div className="rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-5 dark:border-neutral-800/60 dark:bg-neutral-900/20">
                            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                <Info className="h-4 w-4 text-sky-500" />
                                <h3>Informasi Tambahan</h3>
                            </div>
                            <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                                Pastikan nomor handphone belum pernah didaftarkan sebelumnya untuk menghindari duplikasi akun di database.
                            </p>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/40">
                            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                <ClipboardCheck className="h-4 w-4 text-indigo-500" />
                                <h3>Checklist Sebelum Simpan</h3>
                            </div>
                            <div className="mt-3 space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
                                <p>1. Periksa kembali nama lengkap pengguna.</p>
                                <p>2. Pastikan nomor HP masih aktif.</p>
                                <p>3. Gunakan password yang mudah diingat oleh pemilik akun.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/users',
        },
    ],
};