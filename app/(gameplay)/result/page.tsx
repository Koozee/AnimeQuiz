'use client'
import { useRouter } from 'next/navigation';
import {
  ResultRankBadge,
  ResultHeading,
  ResultActions,
  ResultStatsGrid,
  calculateRank
} from '@/components/result';

// Props untuk data hasil quiz (bisa dari URL params atau context)
interface ResultPageProps {
  // Nanti bisa pakai searchParams atau context
}

export default function ResultPage() {
  const router = useRouter();

  // Demo data - nanti diganti dengan data dari quiz atau URL params
  const resultData = {
    correct: 16,
    total: 20,
    mistakes: 4,
  };

  const accuracy = Math.round((resultData.correct / resultData.total) * 100);
  const rank = calculateRank(accuracy);

  const handleRetry = () => {
    router.push('/quiz');
  };

  const handleHome = () => {
    router.push('/dashboard');
  };

  return (
    <main className="bg-black text-slate-900 dark:text-white overflow-x-hidden min-h-screen flex flex-col relative">
      <div className="relative z-10 flex flex-col h-full min-h-screen">
        <div className="flex-1 flex items-center justify-center p-4 md:p-10 w-full max-w-[1200px] mx-auto">
          <div className="bg-linear-to-br from-[#28193c]/70 to-[#140a23]/80 backdrop-blur-xl w-full rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              <div className="lg:w-5/12 relative p-8 md:p-12 flex flex-col justify-center items-center lg:items-start z-10">
                <div className="mb-6">
                  <ResultRankBadge rank={rank} />
                </div>
                <ResultHeading rank={rank} />
                <ResultActions
                  onRetry={handleRetry}
                  onHome={handleHome}
                />
              </div>
              <div className="lg:w-7/12 bg-black/20 p-8 md:p-12 flex flex-col justify-center relative">
                <ResultStatsGrid
                  correct={resultData.correct}
                  total={resultData.total}
                  mistakes={resultData.mistakes}
                  accuracy={accuracy}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}