interface StatCircleProps {
    percentage: number;
    label: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
}

export function StatCircle({
    percentage,
    label,
    primaryColor = '#7f0df2',
    secondaryColor = '#a855f7',
    accentColor = '#22d3ee'
}: StatCircleProps) {
    const gradientStop = percentage;

    return (
        <div className="relative w-44 h-44 group cursor-default">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Conic gradient for Pie Chart */}
            <div
                className="w-full h-full rounded-full transition-all duration-700 group-hover:scale-105 shadow-[0_0_30px_rgba(127,13,242,0.2)]"
                style={{
                    background: `conic-gradient(from 180deg, ${primaryColor} 0%, ${secondaryColor} ${gradientStop * 0.5}%, ${accentColor} ${gradientStop}%, #1e1b2e ${gradientStop}%, #1e1b2e 100%)`,
                    boxShadow: 'inset 0 0 0 4px rgba(255,255,255,0.05)'
                }}
            />
            <div className="absolute inset-4 bg-[#120b18] rounded-full flex flex-col items-center justify-center border border-white/5 shadow-inner">
                <span className="text-4xl font-black text-white tracking-tighter">{percentage}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">{label}</span>
            </div>
        </div>
    );
}
