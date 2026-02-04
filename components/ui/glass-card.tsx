import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    withGlow?: boolean;
    glowColor?: 'primary' | 'cyan' | 'mixed';
}

const glowStyles = {
    primary: 'from-primary/20 to-primary/5',
    cyan: 'from-cyan-500/20 to-cyan-500/5',
    mixed: 'from-primary/20 to-cyan-500/20'
};

export function GlassCard({ children, className = '', withGlow = false, glowColor = 'primary' }: GlassCardProps) {
    return (
        <div className={`relative group ${className}`}>
            {withGlow && (
                <div className={`absolute inset-0 bg-linear-to-r ${glowStyles[glowColor]} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            )}
            <div className="relative bg-linear-to-br from-[#1e1428]/80 to-[#120b18]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                {children}
            </div>
        </div>
    );
}
