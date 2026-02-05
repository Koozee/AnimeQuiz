import { Flag, SkipForward } from 'lucide-react';

interface QuizFooterProps {
    onReport?: () => void;
    onSkip?: () => void;
    showSkip?: boolean;
    showReport?: boolean;
}

export function QuizFooter({
    onReport,
    onSkip,
    showSkip = true,
    showReport = true
}: QuizFooterProps) {
    return (
        <div className="w-full flex justify-between items-center mt-2 px-4 pb-4">
            {showReport ? (
                <button
                    onClick={onReport}
                    className="text-white/40 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <Flag className="w-4 h-4" />
                    Report Issue
                </button>
            ) : (
                <div></div>
            )}

            {showSkip && (
                <button
                    onClick={onSkip}
                    className="text-white/40 hover:text-white hover:bg-white/5 px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2"
                >
                    Skip Question
                    <SkipForward className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
