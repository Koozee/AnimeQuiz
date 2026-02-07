import { supabase } from "@/lib/supabase";

export async function createUser(userData: { codename: string; password: string }) {
    const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();

    return { data, error };
}

export async function getAllUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    return { data, error };
}

export async function getUserById(id: number) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    return { data, error };
}

export async function getUserByCodename(codename: string) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('codename', codename)
        .single();

    return { data, error };
}
