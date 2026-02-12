import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { User } from '@/types/user';

// Re-export for backward compatibility
export type { User } from '@/types/user';

// Hook untuk get semua users
export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*');

            if (error) throw error;
            if (data) setUsers(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, loading, error, refetch: fetchUsers };
}

// Hook untuk get user by ID
export function useUserById(id: number | undefined) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        async function fetchUser() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('id, codename, avatar')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) setUser(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    return { user, loading, error };
}

export const useUser = useUsers;
