import { JWTPayload } from '@/utils/auth';

export interface AuthContextType {
    session: JWTPayload | null;
    loading: boolean;
    isAuthenticated: boolean;
    id?: number;
    codename?: string;
    logout: () => void;
}
