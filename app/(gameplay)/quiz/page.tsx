'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    QuizHeader,
    QuizTimer,
    QuestionCard,
    AnswerOption,
    QuizFooter
} from '@/components/quiz';
import { useQuiz } from '@/hooks/useQuiz';
import { decodeHTMLEntities } from '@/utils/decodeHTMLEntities';

export default function QuizGame() {
    const router = useRouter();
    const [timerKey, setTimerKey] = useState(0);
    const {
        currentQuestion,
        currentIndex,
        answers,
        totalQuestions,
        score,
        streak,
        selectedAnswer,
        isAnswered,
        loading,
        error,
        isGameOver,
        selectAnswer,
        nextQuestion,
        skipQuestion,
    } = useQuiz();

    // Handle answer selection
    const handleSelectAnswer = (label: string) => {
        if (isAnswered) return;

        selectAnswer(label);

        // Auto next after 1.5 seconds
        setTimeout(() => {
            if (!isGameOver) {
                nextQuestion();
                setTimerKey(prev => prev + 1); // Reset timer
            } else {
                router.push('/dashboard');
            }
        }, 1500);
    };

    // Handle time up
    const handleTimeUp = () => {
        skipQuestion();
        setTimerKey(prev => prev + 1);
    };

    // Handle back
    const handleBack = () => {
        router.back();
    };

    // Handle report
    const handleReport = () => {
        console.log('Reported question:', currentQuestion?.question);
    };

    // Loading state
    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold">Loading Quiz...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !currentQuestion) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-bold text-red-500 mb-4">{error || 'No questions available'}</p>
                    <button
                        onClick={() => router.back()}
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

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-5xl mx-auto p-6 flex flex-col justify-center items-center relative z-10 gap-6 md:gap-8">
                <QuizTimer
                    key={timerKey}
                    timer={30}
                    onTimeUp={handleTimeUp}
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