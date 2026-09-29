import { BedDouble } from 'lucide-react';

export default function AppLogoIcon({
    className = 'size-9',
}: {
    className?: string;
}) {
    return (
        <span
            className={`flex shrink-0 items-center justify-center rounded-xl bg-[#0B5D5B] text-white ${className}`}
        >
            <BedDouble className="size-[60%]" />
        </span>
    );
}
