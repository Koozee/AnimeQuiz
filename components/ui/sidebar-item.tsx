import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    path: string;
    icon: LucideIcon;
    label: string;
    active?: boolean;
    badge?: number;
}

export function SidebarItem({ path, icon: Icon, label, active = false, badge }: SidebarItemProps) {
    return (
        <Link
            href={path}
            className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${active
                    ? 'bg-linear-to-r from-primary/20 to-primary/5 text-white border border-primary/30 shadow-[0_0_25px_rgba(127,13,242,0.15)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <div className={`relative ${active ? 'text-primary' : 'group-hover:text-primary transition-colors'}`}>
                <Icon className="w-5 h-5" />
                {active && <div className="absolute inset-0 blur-md bg-primary/50 -z-10" />}
            </div>
            <span className="font-medium">{label}</span>
            {badge && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-primary rounded-full text-white">
                    {badge}
                </span>
            )}
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(127,13,242,0.8)]" />
            )}
        </Link>
    );
}
