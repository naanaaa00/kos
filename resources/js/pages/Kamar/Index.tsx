import { Head, Link } from '@inertiajs/react';
import { Edit3, Home, Plus, Wifi } from 'lucide-react';
import { create, destroy, edit, index } from '@/routes/kamar';
import { ViewDialog } from '@/components/view-dialog';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { FilterTabs } from '@/components/filter-tabs';
import { Pagination, type Paginator } from '@/components/pagination';
import { usePermissions } from '@/hooks/use-permissions';
import { formatCurrency } from '@/lib/utils';

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

export default function Index({
    kamars,
    tipeOptions,
    filters,
}: {
    kamars: Paginator<Kamar>;
    tipeOptions: TipeOption[];
    filters: { tipe: string | null; ketersediaan: string | null };
}) {
    const { can } = usePermissions();

    const filterHref = (params: { tipe?: string | null; ketersediaan?: string | null }) => {
        const query: Record<string, string> = {};
        if (params.tipe) {
            query.tipe = params.tipe;
        }
        if (params.ketersediaan) {
            query.ketersediaan = params.ketersediaan;
        }

        return index.url({ query });
    };

    return (
        <>
            <Head title="Kamar" />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Kamar
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            Daftar kamar dan informasi ketersediaannya.
                        </p>
                    </div>
                    {can('kamar.create') && (
                        <Link
                            href={create()}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            <Plus className="h-4 w-4" />
                            Tambah Kamar
                        </Link>
                    )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <FilterTabs
                        active={filters.ketersediaan}
                        options={[
                            { value: null, label: 'Semua Status' },
                            { value: 'tersedia', label: 'Tersedia' },
                            { value: 'terisi', label: 'Terisi' },
                        ]}
                        hrefFor={(ketersediaan) =>
                            filterHref({ ketersediaan, tipe: filters.tipe })
                        }
                    />
                    <FilterTabs
                        active={filters.tipe}
                        options={[
                            { value: null, label: 'Semua Tipe' },
                            ...tipeOptions,
                        ]}
                        hrefFor={(tipe) =>
                            filterHref({ tipe, ketersediaan: filters.ketersediaan })
                        }
                    />
                </div>

                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200 text-left text-sm dark:divide-neutral-800">
                            <thead className="bg-neutral-50/75 dark:bg-neutral-900">
                                <tr>
                                    <th className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">
                                        No. Kamar
                                    </th>
                                    <th className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">
                                        Tipe
                                    </th>
                                    <th className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">
                                        Harga
                                    </th>
                                    <th className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">
                                        Status
                                    </th>
                                    <th className="relative px-6 py-3.5 text-right">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                                {kamars.data.map((kamar) => (
                                    <tr
                                        key={kamar.id}
                                        className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"
                                    >
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100">
                                            {kamar.no_kamar}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-neutral-600 capitalize dark:text-neutral-400">
                                            {kamar.tipe}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                                            {formatCurrency(kamar.harga)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${kamar.ketersediaan ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'}`}
                                            >
                                                {kamar.ketersediaan
                                                    ? 'Tersedia'
                                                    : 'Terisi'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-3">
                                                <ViewDialog
                                                    title={`Data Kamar ${kamar.no_kamar}`}
                                                    description="Informasi harga, fasilitas, dan status kamar."
                                                    ariaLabel={`Lihat kamar ${kamar.no_kamar}`}
                                                    sections={[
                                                        {
                                                            title: 'Informasi Kamar',
                                                            items: [
                                                                {
                                                                    icon: (
                                                                        <Home className="h-4 w-4" />
                                                                    ),
                                                                    label: 'Nomor Kamar',
                                                                    value: kamar.no_kamar,
                                                                },
                                                                {
                                                                    label: 'Tipe',
                                                                    value: kamar.tipe,
                                                                },
                                                                {
                                                                    label: 'Harga per Bulan',
                                                                    value: formatCurrency(
                                                                        kamar.harga,
                                                                    ),
                                                                },
                                                                {
                                                                    icon: (
                                                                        <Wifi className="h-4 w-4" />
                                                                    ),
                                                                    label: 'Fasilitas',
                                                                    value: kamar.fasilitas,
                                                                },
                                                                {
                                                                    label: 'Status',
                                                                    value: kamar.ketersediaan
                                                                        ? 'Tersedia'
                                                                        : 'Terisi',
                                                                },
                                                            ],
                                                        },
                                                    ]}
                                                />
                                                {can('kamar.update') && (
                                                    <Link
                                                        href={edit(kamar.id)}
                                                        aria-label={`Edit kamar ${kamar.no_kamar}`}
                                                        title={`Edit kamar ${kamar.no_kamar}`}
                                                        className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </Link>
                                                )}
                                                {can('kamar.delete') && (
                                                    <ConfirmDeleteDialog
                                                        title={`Hapus kamar ${kamar.no_kamar}?`}
                                                        description="Data kamar ini akan dihapus secara permanen dan tidak dapat dipulihkan."
                                                        triggerLabel={`Hapus kamar ${kamar.no_kamar}`}
                                                        confirmLabel="Hapus Kamar"
                                                        deleteUrl={
                                                            destroy(kamar.id)
                                                                .url
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination paginator={kamars} />
                </div>
            </div>
        </>
    );
}

Index.layout = { breadcrumbs: [{ title: 'Kamar', href: '/kamar' }] };
