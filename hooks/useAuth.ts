'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, removeAuthToken, JWTPayload } from '@/utils/auth';

interface AuthContextType {
    session: JWTPayload | null;
    loading: boolean;
    isAuthenticated: boolean;
    id?: number;
    codename?: string;
    logout: () => void;
}

export function useAuth(): AuthContextType {
    const [session, setSession] = useState<JWTPayload | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadSession = async () => {
            const authSession = await getSession();
            setSession(authSession);
            setLoading(false);
        };
        loadSession();
    }, []);

    const logout = () => {
        removeAuthToken();
        setSession(null);
        router.push('/login');
    };

    return {
        session,
        loading,
        isAuthenticated: !!session,
        id: session?.id,
        codename: session?.codename,
        logout,
    };
}
