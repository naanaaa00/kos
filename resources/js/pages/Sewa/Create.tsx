import type { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { index, store } from '@/routes/sewa';
import { fieldClass, FormField } from '@/components/form-field';
import { FormActions } from '@/components/form-actions';
import { TransactionFormShell } from '@/components/transaction-form-shell';
import { formatCurrency } from '@/lib/utils';

interface Option {
    id: number;
    name?: string;
    no_kamar?: string;
    harga?: number;
}

export default function Create({
    users,
    kamars,
}: {
    users: Option[];
    kamars: Option[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        tanggal_mulai: '',
        tanggal_selesai: '',
        user_id: '',
        kamar_id: '',
    });
    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(store.url());
    };

    return (
        <TransactionFormShell
            title="Tambah Sewa"
            description="Catat periode sewa baru untuk penghuni."
            active="sewa"
        >
            <form onSubmit={submit} className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <FormField label="Penghuni" error={errors.user_id}>
                        <select
                            value={data.user_id}
                            onChange={(event) =>
                                setData('user_id', event.target.value)
                            }
                            className={fieldClass}
                        >
                            <option value="">Pilih penghuni</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    <FormField label="Kamar" error={errors.kamar_id}>
                        <select
                            value={data.kamar_id}
                            onChange={(event) =>
                                setData('kamar_id', event.target.value)
                            }
                            className={fieldClass}
                        >
                            <option value="">Pilih kamar</option>
                            {kamars.map((kamar) => (
                                <option key={kamar.id} value={kamar.id}>
                                    {kamar.no_kamar}{' '}
                                    {kamar.harga
                                        ? `- ${formatCurrency(kamar.harga)}`
                                        : ''}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    <FormField
                        label="Tanggal Mulai"
                        error={errors.tanggal_mulai}
                    >
                        <input
                            type="date"
                            value={data.tanggal_mulai}
                            onChange={(event) =>
                                setData('tanggal_mulai', event.target.value)
                            }
                            className={fieldClass}
                        />
                    </FormField>
                    <FormField
                        label="Tanggal Selesai"
                        error={errors.tanggal_selesai}
                    >
                        <input
                            type="date"
                            value={data.tanggal_selesai}
                            onChange={(event) =>
                                setData('tanggal_selesai', event.target.value)
                            }
                            className={fieldClass}
                        />
                    </FormField>
                </div>
                <FormActions
                    cancelHref={index()}
                    label="Simpan Sewa"
                    processing={processing}
                />
            </form>
        </TransactionFormShell>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Transaksi', href: '/sewa' },
        { title: 'Sewa', href: '/sewa' },
    ],
};
