import { Flag } from 'lucide-react';

interface QuizFooterProps {
    onReport?: () => void;
}

export function QuizFooter({
    onReport,
}: QuizFooterProps) {
    return (
        <footer className="w-full flex justify-between items-center mt-2 px-4 pb-4">
            <button
                onClick={onReport}
                className="text-white/40 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
                <Flag className="w-4 h-4" />
                Report Issue
            </button>
        </footer>
    );
}
