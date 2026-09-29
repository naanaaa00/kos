import { useEffect, type FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { index, update } from '@/routes/sewa/tagihan';
import { FormActions } from '@/components/form-actions';
import { TransactionFormShell } from '@/components/transaction-form-shell';
import { InvoiceFields, type TagihanFormData } from './InvoiceFields';

interface Tagihan {
    id: number;
    tanggal: string;
    jumlah: number;
    jatuh_tempo: string;
    status_tagihan: string;
    discount: number;
    denda: number;
    sewa_id: number;
    sewa: { room: { harga: number } };
}

export default function Edit({ tagihan }: { tagihan: Tagihan }) {
    const { data, setData, put, processing, errors } = useForm<TagihanFormData>(
        {
            tanggal: tagihan.tanggal.slice(0, 10),
            jumlah: String(tagihan.jumlah),
            jatuh_tempo: tagihan.jatuh_tempo.slice(0, 10),
            status_tagihan: tagihan.status_tagihan,
            discount: String(tagihan.discount),
            denda: String(tagihan.denda),
        },
    );
    const total = Math.max(
        0,
        tagihan.sewa.room.harga -
            Number(data.discount || 0) +
            Number(data.denda || 0),
    );
    useEffect(() => {
        setData('jumlah', String(total));
    }, [total]);
    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        put(update({ sewa: tagihan.sewa_id, tagihan: tagihan.id }).url);
    };

    return (
        <TransactionFormShell
            title="Edit Tagihan"
            description={`Perbarui tagihan #${tagihan.id}.`}
            active="tagihan"
            sewaId={tagihan.sewa_id}
        >
            <form onSubmit={submit} className="space-y-6 p-6">
                <InvoiceFields
                    data={data}
                    onChange={setData}
                    errors={errors}
                    total={total}
                />
                <FormActions
                    cancelHref={index(tagihan.sewa_id)}
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
    ],
};
