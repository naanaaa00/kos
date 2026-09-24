import { Head, usePage } from '@inertiajs/react';
import { KeyRound, ShieldCheck, UserRound } from 'lucide-react';
import { dashboard } from '@/routes';

const permissionLabel = (permission: string): string => {
    const [module, action] = permission.split('.');

    return `${module.replaceAll('_', ' ')}: ${action.replaceAll('_', ' ')}`
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth.user;
    const roleLabel = user?.roles?.join(', ') || 'Belum memiliki role';
    const permissions = user?.permissions ?? [];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto p-4">
                <div>
                    <p className="text-muted-foreground text-sm">Selamat datang kembali</p>
                    <h1 className="text-2xl font-semibold tracking-tight">{user?.name}</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 bg-card flex items-center gap-4 rounded-xl border p-5">
                        <UserRound className="text-muted-foreground size-5" />
                        <div>
                            <p className="text-muted-foreground text-sm">Pengguna</p>
                            <p className="font-medium">{user?.name}</p>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 bg-card flex items-center gap-4 rounded-xl border p-5">
                        <ShieldCheck className="text-muted-foreground size-5" />
                        <div>
                            <p className="text-muted-foreground text-sm">Role aktif</p>
                            <p className="font-medium capitalize">{roleLabel}</p>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 bg-card flex items-center gap-4 rounded-xl border p-5">
                        <KeyRound className="text-muted-foreground size-5" />
                        <div>
                            <p className="text-muted-foreground text-sm">Permission</p>
                            <p className="font-medium">{permissions.length} akses tersedia</p>
                        </div>
                    </div>
                </div>

                <div className="border-sidebar-border/70 bg-card rounded-xl border p-5">
                    <h2 className="font-semibold">Akses akun</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {permissions.length > 0 ? permissions.map((permission) => (
                            <span key={permission} className="bg-muted inline-flex whitespace-nowrap rounded-md px-3 py-1 text-sm">
                                {permissionLabel(permission)}
                            </span>
                        )) : (
                            <p className="text-muted-foreground text-sm">Belum ada permission yang diberikan.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
