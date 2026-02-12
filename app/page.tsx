'use client';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Play,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CategoryCard = ({ image, genre, title }: any) => (
  <div className="group relative rounded-xl overflow-hidden aspect-4/5 bg-neutral-900 border border-white/5 hover:border-primary/50 transition-all cursor-pointer">
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent"></div>
    <div className="absolute bottom-6 left-6">
      <p className={`text-[10px] font-bold tracking-widest uppercase mb-1`}>{genre}</p>
      <h4 className="text-xl font-bold uppercase tracking-tight text-white">{title}</h4>
    </div>
  </div>
);

export default function LandingPage() {
  const router = useRouter();

  const handleMainAction = () => {
    router.push('/quiz/lobby/shonen-jump');
  };

  return (
    <div className="bg-[#120b18]/95 backdrop-blur-2xl text-white min-h-screen overflow-x-hidden selection:bg-primary selection:text-white">

      <header>
        <nav className="fixed top-0 w-full z-50 px-6 lg:px-8 py-6 flex justify-between items-center bg-[#120b18]/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-2">
            <Image src="/img/logoAnimeQuiz.webp" alt="Logo" width={50} height={50} />
            <span className="text-2xl font-bold tracking-tighter uppercase italic text-white">
              AnimeQuiz</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-400">
            {['Missions', 'Leaderboard', 'Categories'].map((item) => (
              <Link key={item} href="#" className="hover:text-white transition-colors">{item}</Link>
            ))}
          </div>
          <Link href="/login" className="px-6 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-all text-sm font-semibold text-white">
            LOGIN
          </Link>
        </nav>
      </header>

      <main className="relative pt-32 lg:pt-24 min-h-screen flex flex-col overflow-hidden">
        <div className="container mx-auto py-10 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 ">

          <div className="space-y-8 max-w-2xl">
            <h1 className="text-5xl lg:text-8xl font-black leading-none tracking-tighter uppercase italic drop-shadow-[0_0_10px_rgba(127,13,242,0.4)] text-white">
              Test Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-blue-500">Anime</span><br />
              Knowledge
            </h1>

            <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg">
              Dive into the ultimate trivia challenge for Otakus. Compete in real-time, unlock legendary profile frames, and prove you're the ultimate Hokage of anime facts.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/login"
                className="group relative px-10 py-5 bg-primary rounded-full font-bold text-lg text-white shadow-[0_0_30px_rgba(127,13,242,0.5)] hover:shadow-[0_0_50px_rgba(127,13,242,0.8)] transition-all flex items-center gap-3 overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 uppercase tracking-widest">
                  Start Game
                </span>
                <Play className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform fill-current" />
              </Link>
            </div>

          </div>
              <Image
                src="/img/heroImage.webp"
                alt="Hero Image"
                width={1000}
                height={1000}
                className="w-full h-full object-cover mix-blend-screen opacity-90 rounded-4xl"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
              />
        </div>

        <section className="py-24 bg-neutral-900/30 border-t border-white/5 relative">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h3 className="text-4xl font-bold tracking-tighter italic uppercase text-white">
                  Choose Your Series
                </h3>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                View All Categories <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CategoryCard
                image="https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=500&auto=format&fit=crop"
                genre="Shonen"
                title="The Big Three"
              />
              <CategoryCard
                image="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=500&auto=format&fit=crop"
                genre="Sci-Fi"
                title="Neo Tokyo Trivia"
              />
              <CategoryCard
                image="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop"
                genre="Fantasy"
                title="Isekai Masters"
              />
              <CategoryCard
                image="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=500&auto=format&fit=crop"
                genre="Classic"
                title="90's Throwback"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 relative overflow-hidden bg-[#120b18]">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8 text-white">
            Ready to Join the Arena?
          </h2>

          <div className="flex flex-col items-center gap-6">
            <Link href="/register" className="px-12 py-5 rounded-full font-black text-xl hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(127,13,242,0.3)] uppercase italic tracking-widest">
              Create Free Account
            </Link>
          </div>

          <div className="mt-20 text-xs font-medium text-slate-600 uppercase tracking-[0.3em]">
            © 2026 Anime Quiz Arena • All Rights Reserved
          </div>
        </div>
      </footer>

    </div>
  );
}