import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET
);
const AUTH_COOKIE_NAME = 'auth_token';

const protectedRoutes = ['/dashboard', '/quiz', '/result'];

const authRoutes = ['/login', '/register'];

async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get(AUTH_COOKIE_NAME);

    let isAuthenticated = false;
    if (authCookie?.value) {
        isAuthenticated = await verifyToken(authCookie.value);
    }

    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Configure which routes the proxy should run on
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/quiz/:path*',
        '/result/:path*',
        '/login',
        '/register',
    ],
};
