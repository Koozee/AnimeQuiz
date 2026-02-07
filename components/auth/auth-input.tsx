import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps {
    icon: LucideIcon;
    type: "text" | "password" | "email";
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
}

export function AuthInput({ icon: Icon, type, placeholder, register, error }: AuthInputProps) {
    return (
        <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon className="text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5" />
            </div>
            <input
                type={type}
                placeholder={placeholder}
                className="block w-full pl-11 pr-4 py-4 bg-[#120b18] border border-white/5 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-[0_0_20px_rgba(127,13,242,0.3)] transition-all duration-300 outline-none"
                {...register}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
