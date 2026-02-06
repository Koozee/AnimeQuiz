import { ArrowLeft, Sparkles } from 'lucide-react';

interface QuizHeaderProps {
    currentQuestion: number;
    totalQuestions: number;
    streak: number;
    score: number;
    onBack?: () => void;
}

export function QuizHeader({
    currentQuestion,
    totalQuestions,
    streak,
    score,
    onBack
}: QuizHeaderProps) {
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <header className="w-full px-6 py-4 flex items-center justify-between z-10">
            <button
                onClick={onBack}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer hover:scale-110"
            >
                <ArrowLeft className="text-white" size={56} />
            </button>

            {/* Progress Bar Center */}
            <div className="flex-1 max-w-md mx-4 md:mx-8">
                <div className="flex justify-between items-end mb-2 px-1">
                    <span className="font-bold text-white">
                        Question {currentQuestion}
                        <span className="text-white">/{totalQuestions}</span>
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
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px]"></div>
                    </div>
                </div>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <Sparkles className="text-yellow-400 w-5 h-5 fill-yellow-400/20" />
                    <span className="text-sm font-bold text-white tabular-nums">
                        {score.toLocaleString()}
                    </span>
                </div>
            </div>
        </header>
    );
}
