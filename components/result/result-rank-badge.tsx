import { Star, Trophy, Award, Medal } from 'lucide-react';

type RankType = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

interface ResultRankBadgeProps {
    rank: RankType;
}

const rankConfig = {
    S: { icon: Trophy, label: 'Legendary', color: 'text-yellow-300', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' },
    A: { icon: Star, label: 'Excellent', color: 'text-emerald-300', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
    B: { icon: Award, label: 'Great', color: 'text-blue-300', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
    C: { icon: Medal, label: 'Good', color: 'text-purple-300', bg: 'bg-purple-500/20', border: 'border-purple-500/50' },
    D: { icon: Medal, label: 'Needs Work', color: 'text-orange-300', bg: 'bg-orange-500/20', border: 'border-orange-500/50' },
    F: { icon: Medal, label: 'Try Again', color: 'text-rose-300', bg: 'bg-rose-500/20', border: 'border-rose-500/50' },
};

export function ResultRankBadge({ rank }: ResultRankBadgeProps) {
    const config = rankConfig[rank];
    const Icon = config.icon;

    return (
        <div className={`
            inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
            ${config.bg} border ${config.border} backdrop-blur-md
        `}>
            <Icon className={`w-4 h-4 fill-current ${config.color}`} />
            <span className={`text-sm font-bold tracking-widest uppercase ${config.color}`}>
                {config.label}
            </span>
        </div>
    );
}

export function calculateRank(percentage: number): RankType {
    if (percentage >= 90) return 'S';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
}
