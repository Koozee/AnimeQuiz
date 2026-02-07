import { SignJWT, jwtVerify } from 'jose';
import Cookies from 'js-cookie';

const JWT_SECRET = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET
);
const AUTH_COOKIE_NAME = 'auth_token';
const COOKIE_EXPIRES_DAYS = 7;

export interface JWTPayload {
    codename: string;
    iat?: number;
    exp?: number;
}

export async function createToken(codename: string): Promise<string> {
    const token = await new SignJWT({ codename })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);

    return token;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as JWTPayload;
    } catch {
        return null;
    }
}

export function setAuthToken(token: string): void {
    Cookies.set(AUTH_COOKIE_NAME, token, {
        expires: COOKIE_EXPIRES_DAYS,
        sameSite: 'lax',
    });
}

export function getAuthToken(): string | undefined {
    return Cookies.get(AUTH_COOKIE_NAME);
}

export function removeAuthToken(): void {
    Cookies.remove(AUTH_COOKIE_NAME);
}

export async function login(codename: string): Promise<void> {
    const token = await createToken(codename);
    setAuthToken(token);
}

export async function getSession(): Promise<JWTPayload | null> {
    const token = getAuthToken();
    if (!token) return null;
    return verifyToken(token);
}
