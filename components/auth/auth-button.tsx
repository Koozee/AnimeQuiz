import { ArrowRight, Loader2 } from "lucide-react";

interface AuthButtonProps {
    text: string;
    type: "submit" | "reset" | "button" | undefined;
    isLoading?: boolean;
}

export function AuthButton({ text, type, isLoading }: AuthButtonProps) {
    return (
        <button type={type} className="group relative w-full h-14 bg-linear-to-r from-primary to-[#6008b8] rounded-full font-bold text-white shadow-[0_4px_20px_rgba(127,13,242,0.4)] hover:shadow-[0_0_30px_rgba(127,13,242,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span className="flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="w-5 h-5 group-hover:translate-x-1 transition-transform animate-spin" /> : text}
                {isLoading ? null : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </span>
        </button>
    );
}
