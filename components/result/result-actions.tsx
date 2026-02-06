import { RotateCcw, Home } from 'lucide-react';

interface ResultActionsProps {
    onRetry?: () => void;
    onHome?: () => void;
    retryLabel?: string;
    homeLabel?: string;
}

export function ResultActions({
    onRetry,
    onHome,
    retryLabel = 'Retry',
    homeLabel = 'Main Menu'
}: ResultActionsProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
                onClick={onRetry}
                className="
                    flex items-center justify-center gap-2 h-14 px-8 rounded-full 
                    bg-primary hover:bg-primary-glow text-white text-base font-bold tracking-wide 
                    transition-all shadow-[0_0_20px_rgba(127,13,242,0.4)] 
                    hover:shadow-[0_0_30px_rgba(127,13,242,0.6)] hover:-translate-y-1 cursor-pointer
                "
            >
                <RotateCcw className="w-5 h-5" />
                <span>{retryLabel}</span>
            </button>
            <button
                onClick={onHome}
                className="
                    flex items-center justify-center gap-2 h-14 px-8 rounded-full 
                    bg-white/5 hover:bg-white/10 border border-white/10 
                    text-white text-base font-bold tracking-wide 
                    transition-all backdrop-blur-sm cursor-pointer
                "
            >
                <Home className="w-5 h-5" />
                <span>{homeLabel}</span>
            </button>
        </div>
    );
}
