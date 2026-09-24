import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit3, MapPin, Phone, Trash2, UserRound, X } from 'lucide-react';
import { create, destroy, edit } from '@/routes/users';
import { ViewDialog } from '@/components/view-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface User {
  id: number;
  name: string;
  no_hp: number;
  detail?: {
    nama: string;
    nik: string;
    alamat: string;
    jenis_kelamin: 'L' | 'P';
  } | null;
}

interface IndexProps {
  users: User[];
}

export default function Index({ users }: IndexProps) {
  const { auth } = usePage().props;
  const permissions = auth.user?.permissions ?? [];
  const canCreate = permissions.includes('users.create');
  const canUpdate = permissions.includes('users.update');
  const canDelete = permissions.includes('users.delete');

  return (
    <>
      <Head title="Users" />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Section dengan Tombol Sejajar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {canUpdate && <div>
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Users
            </h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Daftar seluruh akun pengguna yang terdaftar di sistem.
            </p>
          </div>}

          <div>
            {canCreate && <Link
              href={create()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-offset-neutral-900"
            >
              <svg 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Create User</span>
            </Link>}
          </div>
        </div>

        {/* Tabel dengan Warna Zinc/Neutral yang Menyatu dengan Sidebar */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 backdrop-blur">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 text-left text-sm">
              <thead className="bg-neutral-50/75 dark:bg-neutral-900">
                <tr>
                  <th scope="col" className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3.5 font-semibold text-neutral-900 dark:text-neutral-200">
                    No. Handphone
                  </th>
                  <th scope="col" className="relative px-6 py-3.5 text-right">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                {users.map((user) => (
                  <tr 
                    key={user.id} 
                    className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                      {user.no_hp}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="inline-flex items-center gap-3">
                        <ViewDialog
                          title="Data User"
                          description="Informasi akun dan detail pribadi pengguna."
                          ariaLabel={`Lihat user ${user.name}`}
                          sections={[
                            {
                              title: 'Data Akun',
                              items: [
                                { icon: <UserRound className="h-4 w-4" />, label: 'Nama Akun', value: user.name },
                                { icon: <Phone className="h-4 w-4" />, label: 'No. Handphone', value: String(user.no_hp) },
                              ],
                            },
                            {
                              title: 'Data User Detail',
                              items: user.detail ? [
                                { icon: <UserRound className="h-4 w-4" />, label: 'Nama Lengkap', value: user.detail.nama },
                                { label: 'NIK', value: user.detail.nik, mono: true },
                                { label: 'Jenis Kelamin', value: user.detail.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' },
                                { icon: <MapPin className="h-4 w-4" />, label: 'Alamat', value: user.detail.alamat },
                              ] : undefined,
                              emptyMessage: 'Detail pribadi belum dilengkapi.',
                            },
                          ]}
                        />
                        {canUpdate && <Link
                          href={edit(user.id)}
                          aria-label={`Edit user ${user.name}`}
                          title={`Edit user ${user.name}`}
                          className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>}
                        {canDelete && <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label={`Hapus user ${user.name}`}
                              title={`Hapus user ${user.name}`}
                              className="text-rose-600 hover:bg-rose-50 hover:text-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>Hapus user {user.name}?</DialogTitle>
                            <DialogDescription>
                              Data user ini akan dihapus secara permanen dan tidak dapat dipulihkan.
                            </DialogDescription>
                            <DialogFooter className="gap-2">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  <X className="h-4 w-4" />Batal
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={() => router.delete(destroy(user.id).url)}
                                >
                                  <Trash2 className="h-4 w-4" />Hapus User
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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