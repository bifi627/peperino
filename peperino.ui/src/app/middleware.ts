import { NextRequest, NextResponse } from 'next/server';
import { NEXTJS_FIREBASE_COOKIE } from '../lib/auth/shared/constants';
import { KnownRoutes } from '../lib/routing/knownRoutes';



const isProtectedRoute = (pathname: string) => {
    if (pathname === '/v2/room') {
        return true
    }

    return false;
}

export default async function middleware(req: NextRequest) {
    // To see the protected route its ok to rely on cookie availablility
    // The backend will verify token on protected api calls
    const token = req.cookies.get(NEXTJS_FIREBASE_COOKIE);
    console.log(token);

    if (!token && isProtectedRoute(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(KnownRoutes.V2.Login(req.nextUrl.pathname), req.url));
    }
}

