import { Eye } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export interface ViewDialogItem {
    label: string;
    value: ReactNode;
    icon?: ReactNode;
    mono?: boolean;
}

export interface ViewDialogSection {
    title: string;
    items?: ViewDialogItem[];
    emptyMessage?: string;
}

interface ViewDialogProps {
    title: string;
    description: string;
    ariaLabel: string;
    sections: ViewDialogSection[];
}

export function ViewDialog({ title, description, ariaLabel, sections }: ViewDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant="ghost" size="icon" aria-label={ariaLabel} title={ariaLabel} className="text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl p-0">
                <div className="border-b border-neutral-200 px-6 py-5 dark:border-neutral-800">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="mt-1">{description}</DialogDescription>
                </div>
                <div className="space-y-6 px-6 pb-6">
                    {sections.map((section, index) => (
                        <section key={section.title} className={index > 0 ? 'border-t border-neutral-200 pt-5 dark:border-neutral-800' : undefined}>
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{section.title}</h3>
                            {section.items?.length ? (
                                <dl className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {section.items.map((item) => <ViewDialogItem key={item.label} {...item} />)}
                                </dl>
                            ) : section.emptyMessage ? (
                                <p className="mt-3 rounded-lg border border-dashed border-neutral-300 px-4 py-3 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">{section.emptyMessage}</p>
                            ) : null}
                        </section>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ViewDialogItem({ icon, label, value, mono = false }: ViewDialogItem) {
    return (
        <div>
            <dt className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">{icon}{label}</dt>
            <dd className={`mt-1 whitespace-pre-line text-sm text-neutral-900 dark:text-neutral-100 ${mono ? 'font-mono' : ''}`}>{value}</dd>
        </div>
    );
}