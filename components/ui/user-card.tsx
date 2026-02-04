import Image from 'next/image';
import { Crown, LogOut } from 'lucide-react';

interface UserCardProps {
    name: string;
    role: string;
    avatarSrc: string;
    isOnline?: boolean;
    onLogout?: () => void;
}

export function UserCard({ name, role, avatarSrc, isOnline = true, onLogout }: UserCardProps) {
    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center gap-3 p-4 rounded-2xl bg-linear-to-r from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer">
                <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-linear-to-tr from-cyan-400 to-blue-600 p-[2px]">
                        <Image
                            alt={name}
                            className="w-full h-full rounded-full object-cover bg-black"
                            src={avatarSrc}
                            width={44}
                            height={44}
                        />
                    </div>
                    {isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#120b18] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-white block truncate">{name}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Crown className="w-3 h-3 text-yellow-500" /> {role}
                    </span>
                </div>
                {onLogout && (
                    <button onClick={onLogout} className="text-slate-500 hover:text-red-400 transition-colors">
                        <LogOut className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
