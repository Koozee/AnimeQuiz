export interface QuizQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface ShuffledAnswer {
    label: string;
    text: string;
    isCorrect: boolean;
}

export interface UseQuizReturn {
    // Data
    questions: QuizQuestion[];
    currentQuestion: QuizQuestion | null;
    currentIndex: number;
    answers: ShuffledAnswer[];
    totalQuestions: number;

    // Game State
    score: number;
    streak: number;
    correctAnswers: number;
    selectedAnswer: string | null;
    isAnswered: boolean;

    // Status
    loading: boolean;
    error: string | null;

    // Actions
    selectAnswer: (label: string) => boolean;
    nextQuestion: () => void;
    skipQuestion: () => void;
    resetQuiz: () => void;

    // State Setters (for hydration)
    setCurrentIndex: (index: number) => void;
    setScore: (score: number) => void;
    setStreak: (streak: number) => void;
    setCorrectAnswers: (count: number) => void;
}
