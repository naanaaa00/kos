import type { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { index, store } from '@/routes/tagihan/pembayaran';
import { FormActions } from '@/components/form-actions';
import { TransactionFormShell } from '@/components/transaction-form-shell';
import { PaymentFields, type PembayaranFormData } from './PaymentFields';
import { formatCurrency } from '@/lib/utils';

interface Tagihan {
    id: number;
    jumlah: number;
    sewa: { user: { name: string }; room: { no_kamar: string } };
}

export default function Create({ tagihan }: { tagihan: Tagihan }) {
    const { data, setData, post, processing, errors } =
        useForm<PembayaranFormData>({
            jumlah: String(tagihan.jumlah),
            tanggal_pembayaran: '',
            metode_pembayaran: 'Cash',
        });
    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(store(tagihan.id).url);
    };

    return (
        <TransactionFormShell
            title="Tambah Pembayaran"
            description={`Catat pembayaran ${formatCurrency(tagihan.jumlah)} untuk tagihan #${tagihan.id}.`}
            active="pembayaran"
            tagihanId={tagihan.id}
        >
            <form onSubmit={submit} className="space-y-6 p-6">
                <PaymentFields data={data} onChange={setData} errors={errors} />
                <FormActions
                    cancelHref={index(tagihan.id).url}
                    label="Simpan"
                    processing={processing}
                />
            </form>
        </TransactionFormShell>
    );
}
