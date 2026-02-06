import { useState, useEffect, useCallback } from "react";
import { getQuiz } from "@/services/quiz-service";
import { decodeHTMLEntities } from "@/utils/decodeHTMLEntities";

// Types
interface QuizQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface ShuffledAnswer {
    label: string;
    text: string;
    isCorrect: boolean;
}

interface UseQuizReturn {
    // Data
    questions: QuizQuestion[];
    currentQuestion: QuizQuestion | null;
    currentIndex: number;
    answers: ShuffledAnswer[];
    totalQuestions: number;

    // Game State
    score: number;
    streak: number;
    selectedAnswer: string | null;
    isAnswered: boolean;

    // Status
    loading: boolean;
    error: string | null;
    isGameOver: boolean;

    // Actions
    selectAnswer: (label: string) => boolean; // Returns true if correct
    nextQuestion: () => void;
    skipQuestion: () => void;
    resetQuiz: () => void;
}

// Helper function untuk shuffle array
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function useQuiz(): UseQuizReturn {
    // Data states
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<ShuffledAnswer[]>([]);

    // Game states
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    // Status states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch quiz data
    const fetchQuiz = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getQuiz();

            if (data.response_code === 0 && data.results.length > 0) {
                setQuestions(data.results);
                setCurrentIndex(0);
                setScore(0);
                setStreak(0);
            } else {
                setError('Failed to load questions');
            }
        } catch (err) {
            setError('Failed to fetch quiz. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    // Current question
    const currentQuestion = questions[currentIndex] || null;

    // Shuffle answers when question changes
    useEffect(() => {
        if (!currentQuestion) return;

        const allAnswers = [
            currentQuestion.correct_answer,
            ...currentQuestion.incorrect_answers
        ];

        const shuffled = shuffleArray(allAnswers).map((text, index) => ({
            label: String.fromCharCode(65 + index), // A, B, C, D
            text: decodeHTMLEntities(text),
            isCorrect: text === currentQuestion.correct_answer
        }));

        setAnswers(shuffled);
        setSelectedAnswer(null);
    }, [currentIndex, currentQuestion]);

    // Select answer
    const selectAnswer = useCallback((label: string): boolean => {
        if (selectedAnswer) return false; // Already answered

        setSelectedAnswer(label);

        const selected = answers.find(a => a.label === label);
        const isCorrect = selected?.isCorrect || false;

        if (isCorrect) {
            setScore(prev => prev + 100 + (streak * 10));
            setStreak(prev => prev + 1);
        } else {
            setStreak(0);
        }

        return isCorrect;
    }, [selectedAnswer, answers, streak]);

    // Next question
    const nextQuestion = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, questions.length]);

    // Skip question
    const skipQuestion = useCallback(() => {
        setStreak(0);
        nextQuestion();
    }, [nextQuestion]);

    // Reset quiz
    const resetQuiz = useCallback(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    return {
        // Data
        questions,
        currentQuestion,
        currentIndex,
        answers,
        totalQuestions: questions.length,

        // Game State
        score,
        streak,
        selectedAnswer,
        isAnswered: selectedAnswer !== null,

        // Status
        loading,
        error,
        isGameOver: currentIndex >= questions.length - 1 && selectedAnswer !== null,

        // Actions
        selectAnswer,
        nextQuestion,
        skipQuestion,
        resetQuiz,
    };
}