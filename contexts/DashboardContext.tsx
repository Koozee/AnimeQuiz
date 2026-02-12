'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserById, User } from '@/hooks/useUser';

interface DashboardContextType {
    // Auth data
    id?: number;
    codename?: string;
    isAuthenticated: boolean;
    authLoading: boolean;
    logout: () => void;

    // User data
    user: User | null;
    userLoading: boolean;
    userError: string | null;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}

interface DashboardProviderProps {
    children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
    const { id, codename, isAuthenticated, loading: authLoading, logout } = useAuth();
    const { user, loading: userLoading, error: userError } = useUserById(id);

    const value: DashboardContextType = {
        id,
        codename,
        isAuthenticated,
        authLoading,
        logout,
        user,
        userLoading,
        userError,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}
