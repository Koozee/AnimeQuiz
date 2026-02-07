import { supabase } from "@/lib/supabase";

export async function createUser(userData: { codename: string; password: string }) {
    const { error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();

    return { error };
}

export async function getAllUsers() {
    const { error } = await supabase
        .from('users')
        .select('codename, password');

    return { error };
}

export async function getUserById(id: string) {
    const { error } = await supabase
        .from('users')
        .select('codename')
        .eq('id', id)
        .single();

    return { error };
}

export async function getUserByCodename(codename: string) {
    const { error } = await supabase
        .from('users')
        .select('codename')
        .eq('codename', codename)
        .single();

    return { error };
}
