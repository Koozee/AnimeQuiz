interface StatItemProps {
    value: string | number;
    label: string;
    color?: 'emerald' | 'red' | 'primary' | 'cyan' | 'yellow';
    showDot?: boolean;
}

const colorStyles = {
    emerald: 'text-emerald-400',
    red: 'text-red-400',
    primary: 'text-primary',
    cyan: 'text-cyan-400',
    yellow: 'text-yellow-400'
};

const dotStyles = {
    emerald: 'bg-emerald-400',
    red: 'bg-red-400',
    primary: 'bg-primary',
    cyan: 'bg-cyan-400',
    yellow: 'bg-yellow-400'
};

export function StatItem({ value, label, color = 'emerald', showDot = true }: StatItemProps) {
    return (
        <div className="text-center">
            <div className={`text-2xl font-black ${colorStyles[color]}`}>{value}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1 flex items-center justify-center gap-1">
                {showDot && <div className={`w-2 h-2 ${dotStyles[color]} rounded-full`} />}
                {label}
            </div>
        </div>
    );
}

interface StatsGridProps {
    children: React.ReactNode;
    columns?: 2 | 3 | 4;
}

export function StatsGrid({ children, columns = 2 }: StatsGridProps) {
    const gridCols = {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4'
    };

    return (
        <div className={`w-full max-w-xs bg-linear-to-r from-white/5 to-white/10 rounded-2xl p-5 grid ${gridCols[columns]} gap-4 border border-white/5 [&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-white/10`}>
            {children}
        </div>
    );
}
