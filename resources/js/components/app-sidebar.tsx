import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ClipboardList, FolderGit2, LayoutGrid, ShieldCheck } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
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
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: usersIndex(),
        icon: LayoutGrid,
        permission: 'users.view',
    },
    {
        title: 'Kamar',
        href: kamarIndex(),
        icon: LayoutGrid,
        permission: 'kamar.view',
    },
    {
        title: 'Transaksi',
        href: sewaIndex(),
        icon: ClipboardList,
        permission: 'sewa.view',
    },
    {
        title: 'Roles & Permission',
        href: rolesIndex(),
        icon: ShieldCheck,
        permission: 'roles.manage',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const permissions = auth.user?.permissions ?? [];

    const visibleMainNavItems = mainNavItems.filter(
        (item) =>
            (!item.permission || permissions.includes(item.permission)) &&
            (!item.roles || item.roles.some((role) => auth.user?.roles.includes(role))),
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
