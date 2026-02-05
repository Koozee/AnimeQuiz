import { ArrowLeft, Sparkles } from 'lucide-react';

interface QuizHeaderProps {
    currentQuestion: number;
    totalQuestions: number;
    streak: number;
    score: number;
    quizTitle: string;
    onBack?: () => void;
}

export function QuizHeader({
    currentQuestion,
    totalQuestions,
    streak,
    score,
    quizTitle,
    onBack
}: QuizHeaderProps) {
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <header className="w-full px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full bg-glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="text-white w-5 h-5" />
                </button>
                <div className="hidden md:flex flex-col">
                    <span className="text-xs text-white/60 font-medium tracking-wider uppercase">Current Quiz</span>
                    <span className="text-sm font-bold text-white">{quizTitle}</span>
                </div>
            </div>

            {/* Progress Bar Center */}
            <div className="flex-1 max-w-md mx-4 md:mx-8">
                <div className="flex justify-between items-end mb-2 px-1">
                    <span className="text-sm font-bold text-primary">
                        Question {currentQuestion}
                        <span className="text-white/40 font-normal">/{totalQuestions}</span>
                    </span>
                    {streak > 0 && (
                        <span className="text-xs font-bold text-secondary uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
                            Streak x{streak} 🔥
                        </span>
                    )}
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-linear-to-r from-primary via-[#b04df2] to-secondary rounded-full shadow-[0_0_12px_rgba(127,13,242,0.8)] relative transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
                    </div>
                </div>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full bg-glass border border-white/10 flex items-center gap-2">
                    <Sparkles className="text-yellow-400 w-5 h-5 fill-yellow-400/20" />
                    <span className="text-sm font-bold text-white tabular-nums">
                        {score.toLocaleString()}
                    </span>
                </div>
            </div>
        </header>
    );
}
