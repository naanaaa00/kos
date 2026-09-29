import type { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { User, Phone, ShieldCheck, Info, ClipboardCheck } from 'lucide-react';
import { index, store } from '@/routes/users';
import { FormActions } from '@/components/form-actions';
import { FormField, fieldClass } from '@/components/form-field';
import { PageHeader, BackToIndexButton } from '@/components/page-header';
import { PasswordField } from './PasswordField';
import { digitsOnly } from '@/lib/utils';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        no_hp: '',
        password: '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(store.url());
    };

    return (
        <>
            <Head title="Create User" />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Tambah User Baru"
                    description="Lengkapi informasi akun di bawah ini untuk menambahkan pengguna baru."
                    action={<BackToIndexButton href={index()} />}
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
                            <form onSubmit={submit} className="space-y-5 p-6">
                                <FormField
                                    label="Nama Lengkap"
                                    error={errors.name}
                                >
                                    <div className="relative mt-1.5">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(event) =>
                                                setData(
                                                    'name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="cth. Waridatul Jannah"
                                            className={`${fieldClass} pl-9`}
                                        />
                                    </div>
                                </FormField>

                                <FormField
                                    label="No. Handphone"
                                    error={errors.no_hp}
                                >
                                    <div className="relative mt-1.5">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <input
                                            id="no_hp"
                                            type="tel"
                                            value={data.no_hp}
                                            onChange={(event) =>
                                                setData(
                                                    'no_hp',
                                                    digitsOnly(
                                                        event.target.value,
                                                    ),
                                                )
                                            }
                                            placeholder="cth. 08123456789"
                                            maxLength={15}
                                            className={`${fieldClass} pl-9`}
                                        />
                                    </div>
                                </FormField>

                                <PasswordField
                                    id="password"
                                    label="Password"
                                    value={data.password}
                                    onChange={(value) =>
                                        setData('password', value)
                                    }
                                    error={errors.password}
                                    placeholder="Minimal 8 karakter"
                                />

                                <FormActions
                                    cancelHref={index()}
                                    label={
                                        processing
                                            ? 'Menyimpan...'
                                            : 'Simpan User'
                                    }
                                    processing={processing}
                                />
                            </form>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/40">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                Ketentuan Akun
                            </h3>
                            <ul className="mt-3 list-inside list-disc space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
                                <li>Nomor HP harus berupa angka aktif.</li>
                                <li>
                                    Password dianjurkan minimal 8 karakter
                                    dengan kombinasi huruf dan angka.
                                </li>
                                <li>
                                    Akun yang dibuat akan langsung aktif di
                                    dalam sistem.
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-5 dark:border-neutral-800/60 dark:bg-neutral-900/20">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                <Info className="h-4 w-4 text-sky-500" />
                                Informasi Tambahan
                            </h3>
                            <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                                Pastikan nomor handphone belum pernah
                                didaftarkan sebelumnya untuk menghindari
                                duplikasi akun di database.
                            </p>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/40">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                <ClipboardCheck className="h-4 w-4 text-indigo-500" />
                                Checklist Sebelum Simpan
                            </h3>
                            <div className="mt-3 space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
                                <p>1. Periksa kembali nama lengkap pengguna.</p>
                                <p>2. Pastikan nomor HP masih aktif.</p>
                                <p>
                                    3. Gunakan password yang mudah diingat oleh
                                    pemilik akun.
                                </p>
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
