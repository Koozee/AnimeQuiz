'use client'
import { useState } from 'react';
import {
    LayoutGrid,
    Trophy,
    Settings,
    Menu,
    X,
} from 'lucide-react';

import { SidebarItem, UserCard } from '@/components/dashboard';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth';
import { useUserById } from '@/hooks/useUser';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { id, codename, logout } = useAuth();
    const { user } = useUserById(id);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-white overflow-hidden min-h-screen lg:h-screen flex relative">

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#120b18]/90 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image src="/img/logoAnimeQuiz.webp" alt="Logo" width={50} height={50} />
                    <span className="text-lg font-bold text-white">Anime Quiz</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative z-50 lg:z-20
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                flex flex-col w-72 h-full border-r border-white/5 bg-[#120b18]/95 backdrop-blur-2xl p-6 gap-6 shrink-0
                transition-transform duration-300 ease-out
                pt-20 lg:pt-6
            `}>
                {/* Logo - Hidden on mobile (shown in header) */}
                <div className="hidden lg:flex items-center gap-3 px-2 mb-2">
                    <div className="relative">
                        <Image src="/img/logoAnimeQuiz.webp" alt="Logo" width={50} height={50} />
                        <div className="absolute inset-0 bg-linear-to-br from-primary to-blue-600 rounded-xl blur-lg opacity-50 -z-10" />
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tight text-white block">Anime Quiz</span>
                        <span className="text-[10px] text-primary font-medium uppercase tracking-widest">Pro Edition</span>
                    </div>
                </div>

                <nav className="flex flex-col gap-1.5 flex-1">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-4 mb-2">Main Menu</p>
                    <SidebarItem path="/dashboard" icon={LayoutGrid} label="Dashboard" active={pathname === '/dashboard'} />
                    <SidebarItem path="/dashboard/leaderboard" icon={Trophy} label="Leaderboard" active={pathname.startsWith('/dashboard/leaderboard')} />

                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-4 mb-2 mt-6">Account</p>
                    <SidebarItem path="/dashboard/settings" icon={Settings} label="Settings" active={pathname.startsWith('/dashboard/settings')} />
                </nav>

                {/* User Card */}
                <UserCard
                    name={codename ?? ''}
                    avatarSrc={user?.avatar ?? '/img/heroLogin.webp'}
                    onLogout={logout}
                />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative z-10 pt-16 lg:pt-0 bg-black/90">
                <div className="p-4 lg:p-8 xl:p-10 max-w-6xl mx-auto space-y-8 min-h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}