'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ResultRankBadge,
  ResultHeading,
  ResultActions,
  ResultStatsGrid,
  calculateRank
} from '@/components/result';
import { createSessionQuiz, getSessionQuizById } from '@/services/quiz-service';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('quizId');
  const { id } = useAuth();

  const [resultData, setResultData] = useState<{ correct: number; total: number; mistakes: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await getSessionQuizById({ id: Number(sessionId) });
        if (!error && data) {
          const total = 20;
          const correct = data.correct_answers ?? 0;
          setResultData({
            correct,
            total,
            mistakes: total - correct,
          });
        }
      } catch (err) {
        console.error("Failed to load result", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading Result...</p>
        </div>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-red-500 mb-4">No result data found</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-primary rounded-full font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const accuracy = Math.round((resultData.correct / resultData.total) * 100);
  const rank = calculateRank(accuracy);

  const handleRetry = async () => {
    if (id === undefined) return;

    try {
      const { data, error } = await createSessionQuiz({
        user_id: id,
        current_index: 0,
        correct_answers: 0,
        time_remaining: 90,
        is_completed: false
      });
      if (!error && data) {
        router.push(`/quiz/${data.id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error starting quiz');
    }
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