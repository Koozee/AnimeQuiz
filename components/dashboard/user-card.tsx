import Image from 'next/image';
import { LogOut } from 'lucide-react';

interface UserCardProps {
    name: string;
    avatarSrc: string;
    onLogout?: () => void;
}

export function UserCard({ name, avatarSrc, onLogout }: UserCardProps) {
    return (
        <div className="relative group">
            <button onClick={onLogout} className="w-full relative flex justify-between items-center gap-3 p-4 rounded-2xl bg-linear-to-r from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer">
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
                </div>
                <span className="text-xl font-bold text-white block truncate">{name}</span>
                <LogOut size={20} className="text-red-500" />
            </button>
        </div>
    );
}
