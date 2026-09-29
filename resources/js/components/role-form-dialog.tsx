import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Plus, Save } from 'lucide-react';
import { store, update } from '@/actions/App/Http/Controllers/RoleController';
import { FormField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export type Role = {
    id: number;
    name: string;
    permissions: { name: string }[];
    users_count?: number;
};

type PermissionItem = {
    name: string;
    label: string;
};

type PermissionGroup = {
    module: string;
    label: string;
    items: PermissionItem[];
};

const MODULE_LABELS: Record<string, string> = {
    users: 'Pengguna',
    kamar: 'Kamar',
    sewa: 'Sewa',
    tagihan: 'Tagihan',
    pembayaran: 'Pembayaran',
    roles: 'Roles & Akses',
};

const ACTION_LABELS: Record<string, string> = {
    view: 'Lihat',
    create: 'Tambah',
    update: 'Ubah',
    delete: 'Hapus',
    manage: 'Kelola',
};

export function moduleLabel(module: string): string {
    return MODULE_LABELS[module] ?? module;
}

/**
 * Kelompokkan daftar permission berformat "modul.aksi"
 * menjadi satu grup per modul, cth. "users.view" -> modul "users".
 */
export function groupPermissions(permissions: string[]): PermissionGroup[] {
    const groups = new Map<string, PermissionItem[]>();

    for (const permission of permissions) {
        const [module, action] = permission.split('.');
        const items = groups.get(module) ?? [];
        items.push({
            name: permission,
            label: ACTION_LABELS[action] ?? action ?? permission,
        });
        groups.set(module, items);
    }

    return [...groups.entries()].map(([module, items]) => ({
        module,
        label: moduleLabel(module),
        items,
    }));
}

/**
 * Dialog untuk membuat role baru atau mengatur nama + permission
 * sebuah role yang sudah ada.
 */
export function RoleFormDialog({
    role,
    permissions,
    trigger,
}: {
    role?: Role;
    permissions: string[];
    trigger: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const isEdit = role !== undefined;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? `Atur Role: ${role.name}` : 'Buat Role Baru'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Ubah nama role dan pilih permission yang dimiliki role ini.'
                            : 'Beri nama role lalu pilih permission yang dimiliki role ini.'}
                    </DialogDescription>
                </DialogHeader>

                {open && (
                    <RoleForm
                        role={role}
                        groups={groupPermissions(permissions)}
                        totalPermissions={permissions.length}
                        onSuccess={() => setOpen(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}

/**
 * Form di dalam dialog. Dirender hanya saat dialog terbuka agar
 * state form selalu dimulai dari data role terbaru.
 */
function RoleForm({
    role,
    groups,
    totalPermissions,
    onSuccess,
}: {
    role?: Role;
    groups: PermissionGroup[];
    totalPermissions: number;
    onSuccess: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: role?.name ?? '',
        permissions:
            role?.permissions.map((permission) => permission.name) ?? [],
    });

    const togglePermission = (permission: string) =>
        setData(
            'permissions',
            data.permissions.includes(permission)
                ? data.permissions.filter((item) => item !== permission)
                : [...data.permissions, permission],
        );

    const toggleGroup = (group: PermissionGroup, checked: boolean | 'indeterminate') => {
        const groupNames = group.items.map((item) => item.name);

        setData(
            'permissions',
            checked
                ? [
                      ...data.permissions.filter(
                          (permission) => !groupNames.includes(permission),
                      ),
                      ...groupNames,
                  ]
                : data.permissions.filter(
                      (permission) => !groupNames.includes(permission),
                  ),
        );
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (role) {
            put(update.url(role.id), { onSuccess });
            return;
        }

        post(store.url(), { onSuccess });
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <FormField label="Nama Role" error={errors.name}>
                <Input
                    value={data.name}
                    onChange={(event) => setData('name', event.target.value)}
                    placeholder="Contoh: manager"
                    disabled={role?.name === 'admin'}
                    autoFocus
                />
            </FormField>

            <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Permission
                    </span>
                    <div className="flex items-center gap-3 text-xs">
                        <span className="text-neutral-500 dark:text-neutral-400">
                            {data.permissions.length} dari {totalPermissions}{' '}
                            terpilih
                        </span>
                        <button
                            type="button"
                            onClick={() =>
                                setData(
                                    'permissions',
                                    groups.flatMap((group) =>
                                        group.items.map((item) => item.name),
                                    ),
                                )
                            }
                            className="font-medium text-neutral-600 underline-offset-2 hover:underline dark:text-neutral-400"
                        >
                            Pilih semua
                        </button>
                        <button
                            type="button"
                            onClick={() => setData('permissions', [])}
                            className="font-medium text-neutral-600 underline-offset-2 hover:underline dark:text-neutral-400"
                        >
                            Kosongkan
                        </button>
                    </div>
                </div>

                {errors.permissions && (
                    <p className="mt-1.5 text-xs text-rose-500">
                        {errors.permissions}
                    </p>
                )}

                <div className="mt-2.5 space-y-3">
                    {groups.map((group) => {
                        const selectedCount = group.items.filter((item) =>
                            data.permissions.includes(item.name),
                        ).length;

                        return (
                            <div
                                key={group.module}
                                className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
                            >
                                <div className="flex items-center gap-2.5 border-b border-neutral-200 bg-neutral-50/75 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900">
                                    <Checkbox
                                        checked={
                                            selectedCount === group.items.length
                                        }
                                        onCheckedChange={(checked) =>
                                            toggleGroup(group, checked)
                                        }
                                        aria-label={`Pilih semua permission ${group.label}`}
                                    />
                                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                        {group.label}
                                    </span>
                                    <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">
                                        {selectedCount}/{group.items.length}
                                    </span>
                                </div>
                                <div className="grid gap-2.5 px-3 py-3 sm:grid-cols-2">
                                    {group.items.map((item) => (
                                        <label
                                            key={item.name}
                                            className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                                        >
                                            <Checkbox
                                                checked={data.permissions.includes(
                                                    item.name,
                                                )}
                                                onCheckedChange={() =>
                                                    togglePermission(item.name)
                                                }
                                            />
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                            <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                                                {item.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <DialogFooter>
                <Button type="submit" disabled={processing}>
                    {role ? (
                        <>
                            <Save /> Simpan Perubahan
                        </>
                    ) : (
                        <>
                            <Plus /> Buat Role
                        </>
                    )}
                </Button>
            </DialogFooter>
        </form>
    );
}
