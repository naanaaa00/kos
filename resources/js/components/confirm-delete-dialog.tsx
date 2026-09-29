import { router } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface ConfirmDeleteDialogProps {
    /** Judul konfirmasi, cth. "Hapus kamar A-01?" */
    title: string;
    /** Pesan penjelasan di dalam dialog. */
    description: string;
    /** Label aksesibilitas tombol pemicu, cth. "Hapus kamar A-01". */
    triggerLabel: string;
    /** Label tombol konfirmasi di dalam dialog, cth. "Hapus Kamar". */
    confirmLabel: string;
    /** URL tujuan request DELETE. */
    deleteUrl: string;
}

export function ConfirmDeleteDialog({
    title,
    description,
    triggerLabel,
    confirmLabel,
    deleteUrl,
}: ConfirmDeleteDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={triggerLabel}
                    title={triggerLabel}
                    className="text-rose-600 hover:bg-rose-50 hover:text-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-300"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            <X className="h-4 w-4" />
                            Batal
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => router.delete(deleteUrl)}
                        >
                            <Trash2 className="h-4 w-4" />
                            {confirmLabel}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
