import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/userService";

export function useUser() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const { data, error } = await getAllUsers();

                if (error) throw error;
                if (data) setUsers(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    return { users, loading, error };
}
