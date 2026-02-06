import { CheckCircle2 } from 'lucide-react';

interface AnswerOptionProps {
    label: string;
    text: string;
    isSelected?: boolean;
    isCorrect?: boolean;
    isWrong?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export function AnswerOption({
    label,
    text,
    isSelected,
    isCorrect,
    isWrong,
    disabled,
    onClick
}: AnswerOptionProps) {
    const getStyles = () => {
        if (isCorrect) {
            return 'border-green-500 bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.4)]';
        }
        if (isWrong) {
            return 'border-red-500 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.4)]';
        }
        if (isSelected) {
            return 'border-secondary bg-secondary/10 shadow-electric';
        }
        return 'border-secondary/30';
    };

    const getLabelStyles = () => {
        if (isCorrect) {
            return 'bg-green-500 text-white border-green-500';
        }
        if (isWrong) {
            return 'bg-red-500 text-white border-red-500';
        }
        if (isSelected) {
            return 'bg-secondary text-black border-secondary';
        }
        return 'bg-secondary/10 text-secondary border-secondary/20 group-hover:bg-secondary group-hover:text-black';
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                group relative flex items-center p-4 md:p-5 rounded-full border-2 
                bg-background-dark/40 hover:bg-secondary/10 hover:border-secondary hover:shadow-electric 
                active:scale-[0.98] transition-all duration-200 w-full
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer select-none
                ${getStyles()}
            `}
        >
            <div className={`
                w-10 h-10 rounded-full border flex items-center justify-center mr-4 transition-colors
                ${getLabelStyles()}
            `}>
                <span className="font-bold font-display text-lg">{label}</span>
            </div>

            <span
                className="text-white text-lg font-semibold tracking-wide text-left flex-1"
            >
                {text}
            </span>

            {/* Animated Check Icon */}
            <div className={`
                absolute right-6 transition-all duration-300 transform
                ${isSelected || isCorrect
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
            `}>
                <CheckCircle2 className={`w-6 h-6 ${isCorrect ? 'text-green-500' : 'text-secondary'}`} />
            </div>
        </button>
    );
}
