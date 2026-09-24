import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { KeyRound, Plus, Save, ShieldCheck, Trash2, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { index, store, update, destroy } from '@/actions/App/Http/Controllers/RoleController';
import { update as updateUserRoles } from '@/routes/roles/users';

type Permission = string;

type Role = {
    id: number;
    name: string;
    permissions: { name: string }[];
};

type User = {
    id: number;
    name: string;
    roles: { name: string }[];
};

type Props = {
    roles: Role[];
    permissions: Permission[];
    users: User[];
};

export default function Index({ roles, permissions, users }: Props) {
    const [roleName, setRoleName] = useState('');
    const [newRolePermissions, setNewRolePermissions] = useState<string[]>([]);
    const [roleNames, setRoleNames] = useState<Record<number, string>>(
        Object.fromEntries(roles.map((role) => [role.id, role.name])),
    );
    const [rolePermissions, setRolePermissions] = useState<Record<number, string[]>>(
        Object.fromEntries(roles.map((role) => [role.id, role.permissions.map((permission) => permission.name)])),
    );
    const [userRoles, setUserRoles] = useState<Record<number, string[]>>(
        Object.fromEntries(users.map((user) => [user.id, user.roles.map((role) => role.name)])),
    );

    const togglePermission = (current: string[], permission: string) =>
        current.includes(permission)
            ? current.filter((item) => item !== permission)
            : [...current, permission];

    const createRole = (event: FormEvent) => {
        event.preventDefault();
        router.post(store.url(), { name: roleName, permissions: newRolePermissions });
    };

    const saveRole = (role: Role) => {
        router.put(update.url(role.id), {
            name: roleNames[role.id],
            permissions: rolePermissions[role.id] ?? [],
        });
    };

    const saveUserRoles = (user: User) => {
        router.patch(updateUserRoles.url(user.id), { roles: userRoles[user.id] ?? [] });
    };

    return (
        <>
            <Head title="Roles & Permission" />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">Roles & Permission</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Kelola akses fitur dan role setiap pengguna.
                    </p>
                </div>

                <form onSubmit={createRole} className="rounded-xl border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                        <Plus className="size-4" />
                        <h2 className="font-semibold">Buat role baru</h2>
                    </div>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <Input
                            value={roleName}
                            onChange={(event) => setRoleName(event.target.value)}
                            placeholder="Contoh: manager"
                            aria-label="Nama role baru"
                        />
                        <Button type="submit" disabled={!roleName.trim()}>
                            <Plus /> Buat Role
                        </Button>
                    </div>
                    <PermissionPicker
                        permissions={permissions}
                        selected={newRolePermissions}
                        onChange={setNewRolePermissions}
                    />
                </form>

                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="size-5" />
                        <h2 className="font-semibold">Permission berdasarkan role</h2>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                        {roles.map((role) => (
                            <div key={role.id} className="rounded-xl border bg-card p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <Input
                                        value={roleNames[role.id]}
                                        onChange={(event) => setRoleNames({ ...roleNames, [role.id]: event.target.value })}
                                        disabled={role.name === 'admin'}
                                        aria-label={`Nama role ${role.name}`}
                                        className="font-semibold"
                                    />
                                    <Button type="button" size="icon" variant="outline" onClick={() => saveRole(role)} title="Simpan role">
                                        <Save />
                                    </Button>
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        disabled={role.name === 'admin'}
                                        onClick={() => router.delete(destroy.url(role.id))}
                                        title="Hapus role"
                                    >
                                        <Trash2 className="text-destructive" />
                                    </Button>
                                </div>
                                <PermissionPicker
                                    permissions={permissions}
                                    selected={rolePermissions[role.id] ?? []}
                                    onChange={(selected) => setRolePermissions({ ...rolePermissions, [role.id]: selected })}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Users className="size-5" />
                        <h2 className="font-semibold">Role pengguna</h2>
                    </div>
                    <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
                        <table className="min-w-full text-left text-sm">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-5 py-3 font-semibold">Pengguna</th>
                                    <th className="px-5 py-3 font-semibold">Role</th>
                                    <th className="px-5 py-3 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-5 py-4 font-medium">{user.name}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-4">
                                                {roles.map((role) => {
                                                    const selected = userRoles[user.id]?.includes(role.name) ?? false;
                                                    return (
                                                        <label key={role.id} className="flex items-center gap-2 text-sm">
                                                            <Checkbox
                                                                checked={selected}
                                                                onCheckedChange={(checked) => setUserRoles({
                                                                    ...userRoles,
                                                                    [user.id]: togglePermission(userRoles[user.id] ?? [], role.name),
                                                                })}
                                                            />
                                                            {role.name}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <Button type="button" size="sm" onClick={() => saveUserRoles(user)}>
                                                <Save /> Simpan
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}

function PermissionPicker({
    permissions,
    selected,
    onChange,
}: {
    permissions: Permission[];
    selected: string[];
    onChange: (permissions: string[]) => void;
}) {
    return (
        <div className="mt-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <KeyRound className="size-4" /> Permission
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                {permissions.map((permission) => (
                    <label key={permission} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Checkbox
                            checked={selected.includes(permission)}
                            onCheckedChange={() => onChange(
                                selected.includes(permission)
                                    ? selected.filter((item) => item !== permission)
                                    : [...selected, permission],
                            )}
                        />
                        {permission}
                    </label>
                ))}
            </div>
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Roles & Permission', href: index() },
    ],
};
