import { Link, usePage } from '@inertiajs/react';
import {
    BedDouble,
    LayoutDashboard,
    ReceiptText,
    ShieldCheck,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as kamarIndex } from '@/routes/kamar';
import { index as sewaIndex } from '@/routes/sewa';
import { index as usersIndex } from '@/routes/users';
import { index as rolesIndex } from '@/routes/roles';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Users',
        href: usersIndex(),
        icon: Users,
        permission: 'users.view',
    },
    {
        title: 'Kamar',
        href: kamarIndex(),
        icon: BedDouble,
        permission: 'kamar.view',
    },
    {
        title: 'Transaksi',
        href: sewaIndex(),
        icon: ReceiptText,
        permission: 'sewa.view',
    },
    {
        title: 'Roles & Permission',
        href: rolesIndex(),
        icon: ShieldCheck,
        permission: 'roles.manage',
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const permissions = auth.user?.permissions ?? [];

    const visibleMainNavItems = mainNavItems.filter(
        (item) =>
            (!item.permission || permissions.includes(item.permission)) &&
            (!item.roles ||
                item.roles.some((role) => auth.user?.roles.includes(role))),
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={visibleMainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
