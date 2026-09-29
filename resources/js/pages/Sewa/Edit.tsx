import type { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { index, update } from '@/routes/sewa';
import { fieldClass, FormField } from '@/components/form-field';
import { FormActions } from '@/components/form-actions';
import { TransactionFormShell } from '@/components/transaction-form-shell';

interface Option {
    id: number;
    name?: string;
    no_kamar?: string;
    harga?: number;
}
interface Sewa {
    id: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    user_id: number;
    kamar_id: number;
}

function dateValue(value: string) {
    return value.slice(0, 10);
}

export default function Edit({
    sewa,
    users,
    kamars,
}: {
    sewa: Sewa;
    users: Option[];
    kamars: Option[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        tanggal_mulai: dateValue(sewa.tanggal_mulai),
        tanggal_selesai: dateValue(sewa.tanggal_selesai),
        user_id: String(sewa.user_id),
        kamar_id: String(sewa.kamar_id),
    });
    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        put(update(sewa.id).url);
    };

    return (
        <TransactionFormShell
            title="Edit Sewa"
            description={`Perbarui periode sewa #${sewa.id}.`}
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
                            {kamars.map((kamar) => (
                                <option key={kamar.id} value={kamar.id}>
                                    {kamar.no_kamar}
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
                    label="Simpan Perubahan"
                    processing={processing}
                />
            </form>
        </TransactionFormShell>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Transaksi', href: '/sewa' },
        { title: 'Sewa', href: '/sewa' },
    ],
};
