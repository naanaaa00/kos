import { FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, MapPin, Phone, Save, UserRound, X } from 'lucide-react';
import { index, update } from '@/routes/users';

interface UserDetail {
	id: number;
	nama: string;
	nik: string;
	alamat: string;
	jenis_kelamin: 'L' | 'P';
}

interface User {
	id: number;
	name: string;
	no_hp: number | string;
	detail?: UserDetail | null;
}

interface EditProps {
	user: User;
}

export default function Edit({ user }: EditProps) {
	const [showPassword, setShowPassword] = useState(false);
	const { data, setData, put, processing, errors } = useForm({
		name: user.name,
		no_hp: String(user.no_hp),
		password: '',
		nama: user.detail?.nama ?? '',
		nik: user.detail?.nik ?? '',
		alamat: user.detail?.alamat ?? '',
		jenis_kelamin: user.detail?.jenis_kelamin ?? '',
	});

	const submit: FormEventHandler = (event) => {
		event.preventDefault();
		put(update(user.id).url);
	};

	const fieldClass = 'mt-1.5 block w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400';

	return (
		<>
			<Head title="Edit User" />
			<div className="space-y-6 p-4 sm:p-6 lg:p-8">
				<div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
					<div>
						<h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Edit User</h1>
						<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Perbarui data akun dan informasi pribadi pengguna.</p>
					</div>
					<Link href={index()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"><ArrowLeft className="h-4 w-4" /><span>Kembali ke Daftar</span></Link>
				</div>

				<div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
					<form onSubmit={submit} className="space-y-8 p-6">
						<section className="space-y-5">
							<div className="border-b border-neutral-200 pb-3 dark:border-neutral-800"><h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Data Akun</h2><p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Informasi untuk masuk ke sistem.</p></div>
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								<div><label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Nama Akun <span className="text-rose-500">*</span></label><div className="relative"><UserRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400" /><input id="name" type="text" value={data.name} onChange={(event) => setData('name', event.target.value)} className={`${fieldClass} pl-9`} /></div>{errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}</div>
								<div><label htmlFor="no_hp" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">No. Handphone <span className="text-rose-500">*</span></label><div className="relative"><Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400" /><input id="no_hp" type="tel" maxLength={15} value={data.no_hp} onChange={(event) => setData('no_hp', event.target.value.replace(/\D/g, ''))} className={`${fieldClass} pl-9`} /></div>{errors.no_hp && <p className="mt-1.5 text-xs text-rose-500">{errors.no_hp}</p>}</div>
			</div>
			<div><label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password Baru</label><div className="relative"><Lock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400" /><input id="password" type={showPassword ? 'text' : 'password'} value={data.password} onChange={(event) => setData('password', event.target.value)} placeholder="Kosongkan jika tidak diubah" className={`${fieldClass} pl-9 pr-10`} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'} title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'} className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>{errors.password && <p className="mt-1.5 text-xs text-rose-500">{errors.password}</p>}</div>
						</section>

						<section className="space-y-5">
							<div className="border-b border-neutral-200 pb-3 dark:border-neutral-800"><h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Data User Detail</h2><p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Lengkapi seluruh bagian ini jika ingin menyimpan detail pribadi.</p></div>
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								<div><label htmlFor="nama" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Nama Lengkap</label><div className="relative"><UserRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400" /><input id="nama" type="text" value={data.nama} onChange={(event) => setData('nama', event.target.value)} className={`${fieldClass} pl-9`} /></div>{errors.nama && <p className="mt-1.5 text-xs text-rose-500">{errors.nama}</p>}</div>
								<div><label htmlFor="nik" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">NIK</label><input id="nik" type="text" inputMode="numeric" maxLength={16} value={data.nik} onChange={(event) => setData('nik', event.target.value.replace(/\D/g, ''))} className={fieldClass} />{errors.nik && <p className="mt-1.5 text-xs text-rose-500">{errors.nik}</p>}</div>
							</div>
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								<div><label htmlFor="jenis_kelamin" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Jenis Kelamin</label><select id="jenis_kelamin" value={data.jenis_kelamin} onChange={(event) => setData('jenis_kelamin', event.target.value)} className={fieldClass}><option value="">Pilih jenis kelamin</option><option value="L">Laki-laki</option><option value="P">Perempuan</option></select>{errors.jenis_kelamin && <p className="mt-1.5 text-xs text-rose-500">{errors.jenis_kelamin}</p>}</div>
								<div><label htmlFor="alamat" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Alamat</label><div className="relative"><MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400" /><textarea id="alamat" rows={3} value={data.alamat} onChange={(event) => setData('alamat', event.target.value)} className={`${fieldClass} pl-9`} /></div>{errors.alamat && <p className="mt-1.5 text-xs text-rose-500">{errors.alamat}</p>}</div>
							</div>
						</section>

						<div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800"><Link href={index()} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"><X className="h-4 w-4" />Batal</Link><button type="submit" disabled={processing} className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white shadow transition-all hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">{processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}<span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span></button></div>
					</form>
				</div>
			</div>
		</>
	);
}

Edit.layout = {
	breadcrumbs: [{ title: 'Users', href: '/users' }],
};