import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-black text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-white overflow-x-hidden min-h-screen flex flex-col w-full relative">

            {/* Header */}
            <header className="relative z-10 w-full px-6 py-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <Image src="/img/logoAnimeQuiz.webp" alt="Logo" width={50} height={50} />
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-glow transition-colors">
                            Anime Quiz
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 grow flex items-center justify-center px-4 py-8 lg:px-12">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full py-6 text-center">
                <p className="text-slate-500 text-sm font-medium">© 2026 Anime Quiz. All rights reserved.</p>
            </footer>
        </div>
    );
}