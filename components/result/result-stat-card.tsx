import { LucideIcon } from 'lucide-react';

interface ResultStatCardProps {
    icon: LucideIcon;
    value: string;
    subValue?: string;
    label: string;
    variant?: 'success' | 'error' | 'primary' | 'warning';
}

const variantStyles = {
    success: {
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        iconBg: 'bg-emerald-500/20',
    },
    error: {
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        iconBg: 'bg-rose-500/20',
    },
    primary: {
        border: 'border-white/30',
        text: 'text-white',
        iconBg: 'bg-white/20',
    },
    warning: {
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        iconBg: 'bg-yellow-500/20',
    },
};

export function ResultStatCard({
    icon: Icon,
    value,
    subValue,
    label,
    variant = 'primary'
}: ResultStatCardProps) {
    const styles = variantStyles[variant];

    return (
        <div className={`
            bg-[#1a1023]/80 border ${styles.border} rounded-2xl p-6 
            flex flex-col items-center gap-3 
            hover:border-opacity-100 transition-colors group
        `}>
            <div className={`
                w-12 h-12 rounded-full ${styles.iconBg} 
                flex items-center justify-center ${styles.text} 
                group-hover:scale-110 transition-transform
            `}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">
                    {value}
                    {subValue && <span className="text-white/40 text-lg">{subValue}</span>}
                </p>
                <p className={`text-xs font-bold uppercase tracking-widest ${styles.text}`}>
                    {label}
                </p>
            </div>
        </div>
    );
}
