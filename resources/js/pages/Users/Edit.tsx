import type { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MapPin, Phone, UserRound } from 'lucide-react';
import { index, update } from '@/routes/users';
import { FormActions } from '@/components/form-actions';
import { FormField, fieldClass } from '@/components/form-field';
import { PageHeader, BackToIndexButton } from '@/components/page-header';
import { PasswordField } from './PasswordField';
import { digitsOnly } from '@/lib/utils';

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

    return (
        <>
            <Head title="Edit User" />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Edit User"
                    description="Perbarui data akun dan informasi pribadi pengguna."
                    action={<BackToIndexButton href={index()} />}
                />

                <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
                    <form onSubmit={submit} className="space-y-8 p-6">
                        <section className="space-y-5">
                            <div className="border-b border-neutral-200 pb-3 dark:border-neutral-800">
                                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                    Data Akun
                                </h2>
                                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                    Informasi untuk masuk ke sistem.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <FormField
                                    label="Nama Akun"
                                    error={errors.name}
                                >
                                    <div className="relative">
                                        <UserRound className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-neutral-400" />
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
                                            className={`${fieldClass} pl-9`}
                                        />
                                    </div>
                                </FormField>
                                <FormField
                                    label="No. Handphone"
                                    error={errors.no_hp}
                                >
                                    <div className="relative">
                                        <Phone className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                        <input
                                            id="no_hp"
                                            type="tel"
                                            maxLength={15}
                                            value={data.no_hp}
                                            onChange={(event) =>
                                                setData(
                                                    'no_hp',
                                                    digitsOnly(
                                                        event.target.value,
                                                    ),
                                                )
                                            }
                                            className={`${fieldClass} pl-9`}
                                        />
                                    </div>
                                </FormField>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <PasswordField
                                    id="password"
                                    label="Password Baru"
                                    required={false}
                                    value={data.password}
                                    onChange={(value) =>
                                        setData('password', value)
                                    }
                                    error={errors.password}
                                    placeholder="Kosongkan jika tidak diubah"
                                />
                            </div>
                        </section>

                        <section className="space-y-5">
                            <div className="border-b border-neutral-200 pb-3 dark:border-neutral-800">
                                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                    Data User Detail
                                </h2>
                                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                    Lengkapi seluruh bagian ini jika ingin
                                    menyimpan detail pribadi.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <FormField
                                    label="Nama Lengkap"
                                    error={errors.nama}
                                >
                                    <div className="relative">
                                        <UserRound className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                        <input
                                            id="nama"
                                            type="text"
                                            value={data.nama}
                                            onChange={(event) =>
                                                setData(
                                                    'nama',
                                                    event.target.value,
                                                )
                                            }
                                            className={`${fieldClass} pl-9`}
                                        />
                                    </div>
                                </FormField>
                                <FormField label="NIK" error={errors.nik}>
                                    <input
                                        id="nik"
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={16}
                                        value={data.nik}
                                        onChange={(event) =>
                                            setData(
                                                'nik',
                                                digitsOnly(event.target.value),
                                            )
                                        }
                                        className={fieldClass}
                                    />
                                </FormField>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <FormField
                                    label="Jenis Kelamin"
                                    error={errors.jenis_kelamin}
                                >
                                    <select
                                        id="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        onChange={(event) =>
                                            setData(
                                                'jenis_kelamin',
                                                event.target.value,
                                            )
                                        }
                                        className={fieldClass}
                                    >
                                        <option value="">
                                            Pilih jenis kelamin
                                        </option>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </FormField>
                                <FormField label="Alamat" error={errors.alamat}>
                                    <div className="relative">
                                        <MapPin className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                        <textarea
                                            id="alamat"
                                            rows={3}
                                            value={data.alamat}
                                            onChange={(event) =>
                                                setData(
                                                    'alamat',
                                                    event.target.value,
                                                )
                                            }
                                            className={`${fieldClass} pl-9`}
                                        />
                                    </div>
                                </FormField>
                            </div>
                        </section>

                        <FormActions
                            cancelHref={index()}
                            label={
                                processing ? 'Menyimpan...' : 'Simpan Perubahan'
                            }
                            processing={processing}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [{ title: 'Users', href: '/users' }],
};
