import type { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { index, update } from '@/routes/tagihan/pembayaran';
import { FormActions } from '@/components/form-actions';
import { TransactionFormShell } from '@/components/transaction-form-shell';
import { PaymentFields, type PembayaranFormData } from './PaymentFields';

interface Pembayaran {
    id: number;
    jumlah: number;
    tanggal_pembayaran: string;
    metode_pembayaran: string;
    tagihan_id: number;
    tagihan: { jumlah: number };
}

export default function Edit({ pembayaran }: { pembayaran: Pembayaran }) {
    const { data, setData, put, processing, errors } =
        useForm<PembayaranFormData>({
            jumlah: String(pembayaran.tagihan.jumlah),
            tanggal_pembayaran: pembayaran.tanggal_pembayaran.slice(0, 16),
            metode_pembayaran: pembayaran.metode_pembayaran,
        });
    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        put(
            update({
                tagihan: pembayaran.tagihan_id,
                pembayaran: pembayaran.id,
            }).url,
        );
    };

    return (
        <TransactionFormShell
            title="Edit Pembayaran"
            description={`Perbarui pembayaran #${pembayaran.id}.`}
            active="pembayaran"
            tagihanId={pembayaran.tagihan_id}
        >
            <form onSubmit={submit} className="space-y-6 p-6">
                <PaymentFields data={data} onChange={setData} errors={errors} />
                <FormActions
                    cancelHref={index(pembayaran.tagihan_id)}
                    label="Simpan"
                    processing={processing}
                />
            </form>
        </TransactionFormShell>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Transaksi', href: '/sewa' },
        { title: 'Tagihan', href: '/sewa' },
        { title: 'Pembayaran', href: '/sewa' },
    ],
};
