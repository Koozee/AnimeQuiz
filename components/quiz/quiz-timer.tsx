'use client'
import { useEffect, useRef, useState, useCallback } from "react";

interface QuizTimerProps {
    timer: number;
    onTimeUp?: () => void;
    onTick?: (time: number) => void;
    isPaused?: boolean;
}

export function QuizTimer({ timer, onTimeUp, onTick, isPaused = false }: QuizTimerProps) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [time, setTime] = useState(timer);

    // Reset timer ketika timer berubah (soal baru)
    useEffect(() => {
        setTime(timer);
    }, [timer]);

    // Cleanup function untuk interval
    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isPaused || time <= 0) {
            clearTimer();
            return;
        }

        timerRef.current = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearTimer();
                    return 0;
                }
                const newTime = prevTime - 1;
                if (onTick) onTick(newTime);
                return newTime;
            });
        }, 1000);

        // Cleanup saat unmount atau dependency berubah
        return () => clearTimer();
    }, [isPaused, clearTimer]);

    // Callback ketika waktu habis
    useEffect(() => {
        if (time === 0 && onTimeUp) {
            onTimeUp();
        }
    }, [time, onTimeUp]);

    // Warna berubah jika waktu hampir habis
    const isLowTime = time <= 10;
    const isCriticalTime = time <= 5;
    const isTimeUp = time === 0;

    return (
        <div className="relative group">
            {/* Glow effect - berubah warna jika waktu hampir habis */}
            <div className={`
                absolute inset-0 blur-[20px] opacity-20 group-hover:opacity-40 
                transition-all duration-300 rounded-full
                ${isCriticalTime ? 'bg-red-500 opacity-40' : isLowTime ? 'bg-yellow-500' : 'bg-primary'}
            `}></div>

            {/* Timer circle */}
            <div className={`
                w-24 h-24 rounded-full border-4 backdrop-blur-md 
                flex items-center justify-center relative shadow-xl
                transition-all duration-300
                ${isCriticalTime
                    ? 'border-red-500/50 bg-red-500/10 animate-pulse'
                    : isLowTime
                        ? 'border-yellow-500/30 bg-yellow-500/10'
                        : 'border-white/10 bg-background-dark/80'}
            `}>
                <div className="text-center flex flex-col justify-center items-center">
                    <span className={`
                        text-3xl font-bold leading-none tracking-tight
                        transition-colors duration-300
                        ${isTimeUp ? 'text-base text-red-500' : isCriticalTime ? 'text-red-500' : isLowTime ? 'text-yellow-400' : 'text-white'}
                    `}>
                        {isTimeUp ? 'Time Up' : time}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white/40 mt-1">Sec</span>
                </div>
            </div>
        </div>
    );
}
