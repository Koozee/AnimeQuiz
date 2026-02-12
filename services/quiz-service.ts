import { supabase } from "@/lib/supabase";
import axios from "axios";

export const getQuiz = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=20&category=31&type=multiple');

        // Handle "No Results" (Not enough questions) => Try fewer
        if (response.data.response_code === 1) {
            console.warn("Not enough questions for 20, retrying with 10...");
            const fallback = await axios.get('https://opentdb.com/api.php?amount=10&category=31&type=multiple');
            return fallback.data;
        }

        return response.data;
    } catch (error: any) {
        // Handle Rate Limit (OpenTDB limits to 1 req per 5 sec)
        if (error.response && error.response.status === 429) {
            console.warn("Rate limited, waiting 5s...");
            await new Promise(resolve => setTimeout(resolve, 5000));
            // Retry once
            const retry = await axios.get('https://opentdb.com/api.php?amount=20&category=31&type=multiple');
            return retry.data;
        }
        throw error;
    }
};

export async function createSessionQuiz({ user_id, current_index, correct_answers, is_completed, time_remaining = 90 }: { user_id: number; current_index: number; correct_answers: number; is_completed: boolean; time_remaining?: number }) {
    const { data, error } = await supabase
        .from('quizSessions')
        .insert({
            user_id: user_id,
            current_index: current_index,
            correct_answers: correct_answers,
            is_completed: is_completed,
            time_remaining: time_remaining
        })
        .select()
        .single();

    return { data, error };
}

export async function updateSessionQuiz({ id, current_index, correct_answers, is_completed, time_remaining }: { id: number; current_index: number; correct_answers: number; is_completed: boolean; time_remaining?: number }) {
    const updateData: any = {
        current_index: current_index,
        correct_answers: correct_answers,
        is_completed: is_completed,
    };

    if (time_remaining !== undefined) {
        updateData.time_remaining = time_remaining;
    }

    const { data, error } = await supabase
        .from('quizSessions')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    return { data, error };
}

export async function getSessionQuiz({ user_id }: { user_id: number }) {
    const { data, error } = await supabase
        .from('quizSessions')
        .select('*')
        .eq('user_id', user_id)
        .eq('is_completed', false)
        .single();

    return { data, error };
}

export async function getSessionQuizById({ id }: { id: number }) {
    const { data, error } = await supabase
        .from('quizSessions')
        .select('*')
        .eq('id', id)
        .single();

    return { data, error };
}