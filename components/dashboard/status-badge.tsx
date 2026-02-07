interface StatusBadgeProps {
    text: string;
    variant?: 'cyan' | 'primary' | 'success' | 'warning';
    pulse?: boolean;
}

const variantStyles = {
    cyan: {
        bg: 'bg-gradient-to-r from-cyan-900/50 to-cyan-900/20',
        border: 'border-cyan-500/30',
        text: 'text-cyan-300',
        dot: 'bg-cyan-400',
        glow: 'shadow-[0_0_10px_rgba(34,211,238,1)]'
    },
    primary: {
        bg: 'bg-gradient-to-r from-primary/50 to-primary/20',
        border: 'border-primary/30',
        text: 'text-purple-300',
        dot: 'bg-primary',
        glow: 'shadow-[0_0_10px_rgba(127,13,242,1)]'
    },
    success: {
        bg: 'bg-gradient-to-r from-emerald-900/50 to-emerald-900/20',
        border: 'border-emerald-500/30',
        text: 'text-emerald-300',
        dot: 'bg-emerald-400',
        glow: 'shadow-[0_0_10px_rgba(16,185,129,1)]'
    },
    warning: {
        bg: 'bg-gradient-to-r from-yellow-900/50 to-yellow-900/20',
        border: 'border-yellow-500/30',
        text: 'text-yellow-300',
        dot: 'bg-yellow-400',
        glow: 'shadow-[0_0_10px_rgba(251,191,36,1)]'
    }
};

export function StatusBadge({ text, variant = 'cyan', pulse = true }: StatusBadgeProps) {
    const styles = variantStyles[variant];

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${styles.bg} border ${styles.border} ${styles.text} text-xs font-bold uppercase tracking-wider`}>
            <span className="relative flex h-2 w-2">
                {pulse && (
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${styles.dot} opacity-75`} />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${styles.dot} ${styles.glow}`} />
            </span>
            {text}
        </div>
    );
}
