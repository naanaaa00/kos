import { useEffect, type FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { index, store } from '@/routes/sewa/tagihan';
import { FormActions } from '@/components/form-actions';
import { TransactionFormShell } from '@/components/transaction-form-shell';
import { InvoiceFields, type TagihanFormData } from './InvoiceFields';

interface Sewa {
    id: number;
    tanggal_mulai: string;
    user: { name: string };
    room: { no_kamar: string; harga: number };
}

export default function Create({ sewa }: { sewa: Sewa }) {
    const { data, setData, post, processing, errors } =
        useForm<TagihanFormData>({
            tanggal: sewa.tanggal_mulai.slice(0, 10),
            jumlah: String(sewa.room.harga),
            jatuh_tempo: sewa.tanggal_mulai.slice(0, 10),
            status_tagihan: 'belum_bayar',
            discount: '0',
            denda: '0',
        });
    const total = Math.max(
        0,
        sewa.room.harga - Number(data.discount || 0) + Number(data.denda || 0),
    );
    useEffect(() => {
        setData('jumlah', String(total));
    }, [total]);
    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(store(sewa.id).url);
    };

    return (
        <TransactionFormShell
            title="Tambah Tagihan"
            description={`Buat tagihan untuk ${sewa.user.name} - Kamar ${sewa.room.no_kamar}.`}
            active="tagihan"
            sewaId={sewa.id}
        >
            <form onSubmit={submit} className="space-y-6 p-6">
                <InvoiceFields
                    data={data}
                    onChange={setData}
                    errors={errors}
                    total={total}
                />
                <FormActions
                    cancelHref={index(sewa.id).url}
                    label="Simpan"
                    processing={processing}
                />
            </form>
        </TransactionFormShell>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Transaksi', href: '/sewa' },
        { title: 'Tagihan', href: '/sewa' },
    ],
};
