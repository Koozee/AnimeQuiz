'use client'
import { useState } from 'react';
import {
    Play,
    Swords,
    Sparkles,
    Rotate3D
} from 'lucide-react';

import { StatCircle, StatusBadge, StatItem, StatsGrid } from '@/components/dashboard';

export default function AnimeDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Hero Banner - Enhanced */}
            <div className="relative w-full rounded-[2rem] lg:rounded-[2.5rem] bg-linear-to-br from-[#2a1b3d] via-[#1e1428] to-[#1a1025] border border-white/10 overflow-hidden group shadow-[0_20px_60px_-15px_rgba(127,13,242,0.3)]">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/40 blur-[100px] rounded-full animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/30 blur-[80px] rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-linear(circle_at_center,rgba(127,13,242,0.1),transparent_70%)]" />
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-linear(rgba(255,255,255,0.03) 1px, transparent 1px), linear-linear(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

                <div className="relative z-10 p-6 lg:p-10 xl:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="space-y-6 max-w-xl text-center lg:text-left">
                        <div className="space-y-4">
                            {/* Status Badge - Using reusable component */}
                            <StatusBadge text="System Online • Season 4" variant="cyan" pulse />

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1]">
                                Welcome back, <br />
                                <span className="relative">
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-400 to-cyan-400">Challenger</span>
                                    <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-yellow-400 animate-pulse" />
                                </span>
                            </h1>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-primary to-purple-600 text-white font-bold rounded-2xl shadow-[0_4px_25px_rgba(127,13,242,0.4)] hover:shadow-[0_0_40px_rgba(127,13,242,0.6)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 text-base overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <Play className="fill-current w-5 h-5" />
                                Resume Quiz
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl border border-white/10 hover:border-white/20 transition-all text-base cursor-pointer">
                                <Rotate3D className="w-5 h-5 text-yellow-400" />
                                Restart Quiz
                            </button>
                        </div>
                    </div>

                    {/* Floating 3D Icon Animation - Enhanced */}
                    <div className="hidden lg:flex items-center justify-center relative w-72 h-72 shrink-0">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />

                        {/* Main Icon */}
                        <div className="relative z-10 w-44 h-44 bg-linear-to-br from-primary/40 via-purple-500/30 to-cyan-400/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 rotate-6 group-hover:rotate-12 transition-transform duration-700 shadow-2xl animate-float">
                            <Swords className="text-white w-24 h-24 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                        </div>

                        {/* Orbiting rings */}
                        <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin-slow" />
                        <div className="absolute inset-6 border border-primary/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
                        <div className="absolute inset-12 border border-cyan-500/10 rounded-full animate-spin-slow" style={{ animationDuration: '15s' }} />

                        {/* Floating particles */}
                        <div className="absolute -top-2 right-16 w-4 h-4 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-bounce" />
                        <div className="absolute bottom-4 left-8 w-3 h-3 bg-linear-to-br from-primary to-purple-400 rounded-full shadow-[0_0_15px_rgba(127,13,242,0.8)] animate-pulse" />
                        <div className="absolute top-1/2 -left-2 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-ping" />
                    </div>
                </div>
            </div>

            {/* Win Rate Stats - Using reusable components */}
            <div className="flex flex-col items-center justify-center py-8">
                <h2 className="text-xl font-bold text-white mb-6">Your Statistics</h2>

                {/* Stat Circle - Reusable component */}
                <StatCircle percentage={65} label="Win Rate" />

                {/* Stats Grid - Reusable component */}
                <div className="mt-6">
                    <StatsGrid columns={2}>
                        <StatItem value={142} label="Won" color="emerald" />
                        <StatItem value={84} label="Lost" color="red" />
                    </StatsGrid>
                </div>
            </div>
        </>
    );
}