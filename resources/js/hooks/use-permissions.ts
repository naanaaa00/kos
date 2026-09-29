import { usePage } from '@inertiajs/react';

/**
 * Akses permission pengguna yang sedang login, cth. `can('kamar.create')`.
 */
export function usePermissions() {
    const { auth } = usePage().props;
    const permissions = auth.user?.permissions ?? [];

    return {
        can: (permission: string): boolean => permissions.includes(permission),
    };
}
