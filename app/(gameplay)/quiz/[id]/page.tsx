'use client'
import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    QuizHeader,
    QuizTimer,
    QuestionCard,
    AnswerOption,
    QuizFooter
} from '@/components/quiz';
import { useQuiz } from '@/hooks/useQuiz';
import { decodeHTMLEntities } from '@/utils/decodeHTMLEntities';
import toast from 'react-hot-toast';
import { getSessionQuizById, updateSessionQuiz } from '@/services/quiz-service';

export default function QuizGame() {
    const router = useRouter();
    const params = useParams();
    const sessionId = params.id as string;
    const [session, setSession] = useState<any>(null);
    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    const [hasSynced, setHasSynced] = useState(false);
    const timeRemainingRef = useRef<number>(90);

    const currentIndexRef = useRef(0);
    const correctAnswersRef = useRef(0);
    const hasSyncedRef = useRef(false);

    const {
        currentQuestion,
        currentIndex,
        answers,
        totalQuestions,
        score,
        streak,
        selectedAnswer,
        correctAnswers,
        isAnswered,
        loading,
        error,
        selectAnswer,
        nextQuestion,
        skipQuestion,
        setCurrentIndex,
        setCorrectAnswers,
    } = useQuiz();

    // Keep refs in sync with latest state values
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        correctAnswersRef.current = correctAnswers;
    }, [correctAnswers]);

    useEffect(() => {
        hasSyncedRef.current = hasSynced;
    }, [hasSynced]);

    useEffect(() => {
        const fetchSession = async () => {
            if (!sessionId) return;
            try {
                const { data, error } = await getSessionQuizById({ id: Number(sessionId) });
                if (!error && data) {
                    setSession(data);
                }
            } catch (err) {
                console.error("Failed to load session", err);
            } finally {
                setIsSessionLoaded(true);
            }
        };
        fetchSession();
    }, [sessionId]);

    // Sync session state to quiz hook once both are ready
    useEffect(() => {
        if (!loading && isSessionLoaded && !hasSynced) {
            if (session) {
                if (session.current_index > 0) {
                    setCurrentIndex(session.current_index);
                }
                if (session.correct_answers > 0) {
                    setCorrectAnswers(session.correct_answers);
                }
                if (session.is_completed) {
                    router.replace(`/result?quizId=${sessionId}`);
                }
                if (session.time_remaining !== undefined && session.time_remaining !== null) {
                    timeRemainingRef.current = session.time_remaining;
                }
            }
            setHasSynced(true);
        }
    }, [loading, isSessionLoaded, session, hasSynced, setCurrentIndex, setCorrectAnswers, router]);

    const handleTick = (time: number) => {
        timeRemainingRef.current = time;
    };

    // Save progress periodically and when window is closed/refreshed
    // Uses refs so the interval always reads the LATEST values, not stale closure values
    useEffect(() => {
        const saveState = () => {
            if (!hasSyncedRef.current) return;

            updateSessionQuiz({
                id: Number(sessionId),
                current_index: currentIndexRef.current,
                correct_answers: correctAnswersRef.current,
                is_completed: false,
                time_remaining: timeRemainingRef.current
            });
        };

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            saveState();
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                saveState();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const intervalId = setInterval(saveState, 1000);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(intervalId);
        };
    }, [sessionId]);

    const handleSelectAnswer = async (label: string) => {
        if (isAnswered) return;

        const isCorrect = selectAnswer(label);

        const newCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);

        await updateSessionQuiz({
            id: Number(sessionId),
            current_index: currentIndex,
            correct_answers: newCorrectAnswers,
            is_completed: false,
            time_remaining: timeRemainingRef.current
        });

        setTimeout(async () => {
            const isLastQuestion = currentIndex >= totalQuestions - 1;

            if (!isLastQuestion) {
                nextQuestion();
                timeRemainingRef.current = 90;
                await updateSessionQuiz({
                    id: Number(sessionId),
                    current_index: currentIndex + 1,
                    correct_answers: newCorrectAnswers,
                    is_completed: false,
                    time_remaining: 90
                });
            } else {
                await updateSessionQuiz({
                    id: Number(sessionId),
                    current_index: currentIndex,
                    correct_answers: newCorrectAnswers,
                    is_completed: true,
                    time_remaining: 0
                });
                router.push(`/result?quizId=${sessionId}`);
            }
        }, 1500);
    };

    const handleTimeUp = async () => {
        const isLastQuestion = currentIndex >= totalQuestions - 1;

        if (!isLastQuestion) {
            skipQuestion();
            await updateSessionQuiz({
                id: Number(sessionId),
                current_index: currentIndex + 1,
                correct_answers: correctAnswers,
                is_completed: false
            });
        } else {
            await updateSessionQuiz({
                id: Number(sessionId),
                current_index: currentIndex,
                correct_answers: correctAnswers,
                is_completed: true
            });
            router.push(`/result?quizId=${sessionId}`);
        }
    };

    const handleBack = async () => {
        await updateSessionQuiz({
            id: Number(sessionId),
            current_index: currentIndex,
            correct_answers: correctAnswers,
            is_completed: false,
            time_remaining: timeRemainingRef.current
        });
        router.push('/dashboard');
    };

    const handleReport = () => {
        toast.success('Reported question successfully');
    };

    if (loading || !isSessionLoaded || !hasSynced) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold">Loading Quiz...</p>
                </div>
            </div>
        );
    }

    if (error || !currentQuestion) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-bold text-red-500 mb-4">{error || 'No questions available'}</p>
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

    return (
        <div className="bg-black text-white min-h-screen flex flex-col overflow-hidden bg-anime-linear relative">
            <QuizHeader
                currentQuestion={currentIndex + 1}
                totalQuestions={totalQuestions}
                streak={streak}
                score={score}
                onBack={handleBack}
            />

            <main className="flex-1 w-full max-w-5xl mx-auto p-6 flex flex-col justify-center items-center relative z-10 gap-6 md:gap-8">
                <QuizTimer
                    timer={session?.time_remaining || 90}
                    onTimeUp={handleTimeUp}
                    onTick={handleTick}
                    isPaused={isAnswered}
                />
                <QuestionCard
                    question={decodeHTMLEntities(currentQuestion.question)}
                />
                {/* Answer Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {answers.map((answer) => (
                        <AnswerOption
                            key={answer.label}
                            label={answer.label}
                            text={answer.text}
                            isSelected={selectedAnswer === answer.label}
                            isCorrect={isAnswered && answer.isCorrect}
                            isWrong={selectedAnswer === answer.label && !answer.isCorrect}
                            disabled={isAnswered}
                            onClick={() => handleSelectAnswer(answer.label)}
                        />
                    ))}
                </div>
                <QuizFooter onReport={handleReport} />
            </main>
        </div>
    );
}
