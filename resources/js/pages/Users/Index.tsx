import { Head, Link, router } from '@inertiajs/react';
import { Edit3, MapPin, Phone, UserRound } from 'lucide-react';
import { create, destroy, edit } from '@/routes/users';
import { update as updateUserRoles } from '@/routes/roles/users';
import { ViewDialog } from '@/components/view-dialog';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { Pagination, type Paginator } from '@/components/pagination';
import { usePermissions } from '@/hooks/use-permissions';

interface User {
    id: number;
    name: string;
    no_hp: number;
    roles: { name: string }[];
    detail?: {
        nama: string;
        nik: string;
        alamat: string;
        jenis_kelamin: 'L' | 'P';
    } | null;
}

interface IndexProps {
    users: Paginator<User>;
    roles: string[];
}

export default function Index({ users, roles }: IndexProps) {
    const { can } = usePermissions();
    const canManageRoles = can('roles.manage');

    const changeRole = (user: User, role: string) => {
        if (!role || user.roles[0]?.name === role) {
            return;
        }

        router.patch(
            updateUserRoles.url(user.id),
            { roles: [role] },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Users" />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Users
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            Daftar seluruh akun pengguna yang terdaftar di
                            sistem.
                        </p>
                    </div>

                    {can('users.create') && (
                        <Link
                            href={create()}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:outline-none dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-offset-neutral-900"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            <span>Create User</span>
                        </Link>
                    )}
                </div>

                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200 text-left text-sm dark:divide-neutral-800">
                            <thead className="bg-neutral-50/75 dark:bg-neutral-900">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200"
                                    >
                                        No. Handphone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative px-6 py-3.5 text-right"
                                    >
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                                {users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"
                                    >
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                                            {user.no_hp}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {canManageRoles && roles.length > 0 ? (
                                                <select
                                                    value={user.roles[0]?.name ?? ''}
                                                    onChange={(event) =>
                                                        changeRole(user, event.target.value)
                                                    }
                                                    aria-label={`Ubah role ${user.name}`}
                                                    className="h-9 rounded-md border border-neutral-200 bg-white px-2.5 text-sm text-neutral-900 shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-neutral-400 focus-visible:ring-[3px] focus-visible:ring-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus-visible:border-neutral-600 dark:focus-visible:ring-neutral-800"
                                                >
                                                    {user.roles.length === 0 && (
                                                        <option value="">—</option>
                                                    )}
                                                    {roles.map((role) => (
                                                        <option key={role} value={role}>
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    {user.roles
                                                        .map((role) => role.name)
                                                        .join(', ') || '—'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <div className="inline-flex items-center gap-3">
                                                <ViewDialog
                                                    title="Data User"
                                                    description="Informasi akun dan detail pribadi pengguna."
                                                    ariaLabel={`Lihat user ${user.name}`}
                                                    sections={[
                                                        {
                                                            title: 'Data Akun',
                                                            items: [
                                                                {
                                                                    icon: (
                                                                        <UserRound className="h-4 w-4" />
                                                                    ),
                                                                    label: 'Nama Akun',
                                                                    value: user.name,
                                                                },
                                                                {
                                                                    icon: (
                                                                        <Phone className="h-4 w-4" />
                                                                    ),
                                                                    label: 'No. Handphone',
                                                                    value: String(
                                                                        user.no_hp,
                                                                    ),
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            title: 'Data User Detail',
                                                            items: user.detail
                                                                ? [
                                                                      {
                                                                          icon: (
                                                                              <UserRound className="h-4 w-4" />
                                                                          ),
                                                                          label: 'Nama Lengkap',
                                                                          value: user
                                                                              .detail
                                                                              .nama,
                                                                      },
                                                                      {
                                                                          label: 'NIK',
                                                                          value: user
                                                                              .detail
                                                                              .nik,
                                                                          mono: true,
                                                                      },
                                                                      {
                                                                          label: 'Jenis Kelamin',
                                                                          value:
                                                                              user
                                                                                  .detail
                                                                                  .jenis_kelamin ===
                                                                              'L'
                                                                                  ? 'Laki-laki'
                                                                                  : 'Perempuan',
                                                                      },
                                                                      {
                                                                          icon: (
                                                                              <MapPin className="h-4 w-4" />
                                                                          ),
                                                                          label: 'Alamat',
                                                                          value: user
                                                                              .detail
                                                                              .alamat,
                                                                      },
                                                                  ]
                                                                : undefined,
                                                            emptyMessage:
                                                                'Detail pribadi belum dilengkapi.',
                                                        },
                                                    ]}
                                                />
                                                {can('users.update') && (
                                                    <Link
                                                        href={edit(user.id)}
                                                        aria-label={`Edit user ${user.name}`}
                                                        title={`Edit user ${user.name}`}
                                                        className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </Link>
                                                )}
                                                {can('users.delete') && (
                                                    <ConfirmDeleteDialog
                                                        title={`Hapus user ${user.name}?`}
                                                        description="Data user ini akan dihapus secara permanen dan tidak dapat dipulihkan."
                                                        triggerLabel={`Hapus user ${user.name}`}
                                                        confirmLabel="Hapus User"
                                                        deleteUrl={
                                                            destroy(user.id).url
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
                    <Pagination paginator={users} />
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/users',
        },
    ],
};
