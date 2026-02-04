'use client'
import {
    User,
    Key,
    ArrowRight,
    Globe,
} from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Mascot / Visual */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start order-2 lg:order-1 animate-float">
                <div className="relative w-full max-w-[600px] aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                    {/* Image Container */}
                    <Image
                        src="/img/heroLogin.webp"
                        alt="Cyberpunk anime style visual"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        placeholder='blur'
                        blurDataURL="/img/heroLogin.webp"
                    />
                    {/* Overlay Text */}
                    <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-transparent to-transparent flex flex-col justify-end p-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold w-fit mb-4 uppercase tracking-wider shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Season 4 Live
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg mb-2">
                            Prove Your <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Otaku Level</span>
                        </h2>
                        <p className="text-slate-300 text-sm lg:text-base max-w-md">
                            Join over 10,000 challengers in the ultimate anime trivia showdown.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Glass Login Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto order-1 lg:order-2">

                {/* Glass Card */}
                <div className="bg-glass backdrop-blur-xl border border-glass-border p-8 rounded-[2rem] shadow-2xl">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2 text-center lg:text-left">
                            <h1 className="text-4xl font-black tracking-tighter text-white">
                                Ready, Challenger?
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">
                                Enter your codename to initialize the mission.
                            </p>
                        </div>

                        <form className="space-y-4 pt-2" onSubmit={(e) => e.preventDefault()}>
                            {/* Username Input */}
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Codename"
                                    className="block w-full pl-11 pr-4 py-4 bg-[#120b18] border border-white/5 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-[0_0_20px_rgba(127,13,242,0.3)] transition-all duration-300 outline-none"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Key className="text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Access Key"
                                    className="block w-full pl-11 pr-4 py-4 bg-[#120b18] border border-white/5 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-[0_0_20px_rgba(127,13,242,0.3)] transition-all duration-300 outline-none"
                                />
                            </div>

                            {/* Action Button */}
                            <button className="group relative w-full h-14 bg-linear-to-r from-primary to-[#6008b8] rounded-full font-bold text-white shadow-[0_4px_20px_rgba(127,13,242,0.4)] hover:shadow-[0_0_30px_rgba(127,13,242,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 overflow-hidden">
                                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                <span className="flex items-center justify-center gap-2">
                                    Start Mission
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex py-2 items-center">
                            <div className="grow border-t border-white/10"></div>
                            <span className="shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-widest">Or login with</span>
                            <div className="grow border-t border-white/10"></div>
                        </div>

                        {/* Social Login */}
                        <button className="flex items-center justify-center h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-sm font-medium gap-2">
                            <Globe className="w-[18px] h-[18px]" />
                            Google
                        </button>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-slate-400 text-sm">
                            Don't have an account?{" "}
                            <Link href="/register" className="hover:underline font-bold transition-colors">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}