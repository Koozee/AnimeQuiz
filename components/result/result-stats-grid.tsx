import { CheckCircle2, XCircle, Target, Clock, Zap } from 'lucide-react';
import { ResultStatCard } from './result-stat-card';

interface ResultStatsGridProps {
    correct: number;
    total: number;
    mistakes: number;
    accuracy: number;
    showTime?: boolean;
    timeSpent?: string;
    showStreak?: boolean;
    bestStreak?: number;
}

export function ResultStatsGrid({
    correct,
    total,
    mistakes,
    accuracy,
    showTime = false,
    timeSpent,
    showStreak = false,
    bestStreak
}: ResultStatsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 z-10">
            <ResultStatCard
                icon={CheckCircle2}
                value={String(correct)}
                subValue={`/${total}`}
                label="Correct"
                variant="success"
            />
            <ResultStatCard
                icon={XCircle}
                value={String(mistakes)}
                label="Mistakes"
                variant="error"
            />
            <ResultStatCard
                icon={Target}
                value={`${accuracy}%`}
                label="Accuracy"
                variant="primary"
            />
            {showTime && timeSpent && (
                <ResultStatCard
                    icon={Clock}
                    value={timeSpent}
                    label="Time Spent"
                    variant="warning"
                />
            )}
            {showStreak && bestStreak !== undefined && (
                <ResultStatCard
                    icon={Zap}
                    value={String(bestStreak)}
                    label="Best Streak"
                    variant="warning"
                />
            )}
        </div>
    );
}
