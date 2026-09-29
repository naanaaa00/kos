import { Head } from '@inertiajs/react';
import { KeyRound, Plus, Trash2 } from 'lucide-react';
import { destroy, index } from '@/actions/App/Http/Controllers/RoleController';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import {
    moduleLabel,
    RoleFormDialog,
    type Role,
} from '@/components/role-form-dialog';
import { Pagination, type Paginator } from '@/components/pagination';
import { Button } from '@/components/ui/button';

type Props = {
    roles: Paginator<Role>;
    permissions: string[];
};

export default function Index({ roles, permissions }: Props) {
    const roleModules = (role: Role): string[] =>
        [
            ...new Set(
                role.permissions.map((permission) =>
                    permission.name.split('.')[0],
                ),
            ),
        ].sort();

    return (
        <>
            <Head title="Roles & Permission" />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Roles & Permission
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            Kelola role beserta permission aksesnya. Role untuk
                            tiap pengguna diatur dari halaman Users.
                        </p>
                    </div>

                    <RoleFormDialog
                        permissions={permissions}
                        trigger={
                            <Button>
                                <Plus /> Buat Role
                            </Button>
                        }
                    />
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
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200"
                                    >
                                        Permission
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200"
                                    >
                                        Pengguna
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative px-6 py-3.5 text-right"
                                    >
                                        <span className="sr-only">Aksi</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                                {roles.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400"
                                        >
                                            Belum ada role. Klik &quot;Buat
                                            Role&quot; untuk membuat role
                                            pertama.
                                        </td>
                                    </tr>
                                )}

                                {roles.data.map((role) => {
                                    const hasAllPermissions =
                                        permissions.length > 0 &&
                                        role.permissions.length ===
                                            permissions.length;

                                    return (
                                        <tr
                                            key={role.id}
                                            className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-6 py-4 font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100">
                                                {role.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {role.permissions.length ===
                                                0 ? (
                                                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                                        Tidak ada akses
                                                    </span>
                                                ) : hasAllPermissions ? (
                                                    <span className="inline-flex items-center rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900">
                                                        Semua akses
                                                    </span>
                                                ) : (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {roleModules(
                                                            role,
                                                        ).map((module) => (
                                                            <span
                                                                key={module}
                                                                title={role.permissions
                                                                    .map(
                                                                        (
                                                                            permission,
                                                                        ) =>
                                                                            permission.name,
                                                                    )
                                                                    .join(
                                                                        ', ',
                                                                    )}
                                                                className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300"
                                                            >
                                                                {moduleLabel(
                                                                    module,
                                                                )}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                                                {role.users_count ?? 0}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <div className="inline-flex items-center gap-3">
                                                    <RoleFormDialog
                                                        role={role}
                                                        permissions={
                                                            permissions
                                                        }
                                                        trigger={
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                <KeyRound />{' '}
                                                                Atur Permission
                                                            </Button>
                                                        }
                                                    />
                                                    {role.name === 'admin' ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            disabled
                                                            title="Role bawaan tidak dapat dihapus"
                                                        >
                                                            <Trash2 className="text-rose-600 dark:text-rose-400" />
                                                        </Button>
                                                    ) : (
                                                        <ConfirmDeleteDialog
                                                            title={`Hapus role ${role.name}?`}
                                                            description="Role ini akan dihapus permanen dan tidak dapat dipulihkan."
                                                            triggerLabel={`Hapus role ${role.name}`}
                                                            confirmLabel="Hapus Role"
                                                            deleteUrl={destroy(
                                                                role.id,
                                                            ).url}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Pagination paginator={roles} />
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [{ title: 'Roles & Permission', href: index.url() }],
};
