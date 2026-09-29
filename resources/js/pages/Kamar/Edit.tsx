import type { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { index, update } from '@/routes/kamar';
import { FormActions } from '@/components/form-actions';
import { PageHeader, BackToIndexButton } from '@/components/page-header';
import { KamarFormFields, type KamarFormData } from './KamarFormFields';

interface Kamar {
    id: number;
    no_kamar: string;
    tipe: string;
    harga: number;
    fasilitas: string;
    ketersediaan: boolean;
}

interface TipeOption {
    value: string;
    label: string;
}

export default function Edit({
    kamar,
    tipeOptions,
}: {
    kamar: Kamar;
    tipeOptions: TipeOption[];
}) {
    const { data, setData, put, processing, errors } = useForm<KamarFormData>({
        no_kamar: kamar.no_kamar,
        tipe: kamar.tipe,
        harga: String(kamar.harga),
        fasilitas: kamar.fasilitas,
        ketersediaan: kamar.ketersediaan,
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        put(update(kamar.id).url);
    };

    return (
        <>
            <Head title={`Edit Kamar ${kamar.no_kamar}`} />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Edit Kamar"
                    description={`Perbarui informasi kamar ${kamar.no_kamar}.`}
                    action={<BackToIndexButton href={index()} />}
                />
                <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
                    <form onSubmit={submit} className="space-y-6 p-6">
                        <KamarFormFields
                            data={data}
                            tipeOptions={tipeOptions}
                            onChange={setData}
                            errors={errors}
                        />
                        <FormActions
                            cancelHref={index()}
                            label="Simpan Perubahan"
                            processing={processing}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = { breadcrumbs: [{ title: 'Kamar', href: '/kamar' }] };
