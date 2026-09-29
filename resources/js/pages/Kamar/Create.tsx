import type { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { store, index } from '@/routes/kamar';
import { FormActions } from '@/components/form-actions';
import { PageHeader, BackToIndexButton } from '@/components/page-header';
import { KamarFormFields, type KamarFormData } from './KamarFormFields';

interface TipeOption {
    value: string;
    label: string;
}

export default function Create({
    tipeOptions,
}: {
    tipeOptions: TipeOption[];
}) {
    const { data, setData, post, processing, errors } = useForm<KamarFormData>({
        no_kamar: '',
        tipe: 'ekonomi',
        harga: '',
        fasilitas: '',
        ketersediaan: true,
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(store.url());
    };

    return (
        <>
            <Head title="Tambah Kamar" />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Tambah Kamar Baru"
                    description="Lengkapi informasi kamar untuk menambah data baru."
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
                            label="Simpan Kamar"
                            processing={processing}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = { breadcrumbs: [{ title: 'Kamar', href: '/kamar' }] };
