import { Settings, Construction, Sparkles } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-linear-to-r from-primary/30 to-cyan-500/30 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 bg-linear-to-br from-white/10 to-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                    <Settings className="w-12 h-12 text-primary animate-spin-slow" />
                </div>
                <div className="absolute -top-2 -right-2">
                    <Construction className="w-8 h-8 text-yellow-400" />
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                Coming Soon
                <Sparkles className="inline-block w-6 h-6 text-yellow-400 ml-2 animate-pulse" />
            </h1>

            <span className="text-xs text-slate-500 mt-2">Development in progress...</span>
        </div>
    );
}