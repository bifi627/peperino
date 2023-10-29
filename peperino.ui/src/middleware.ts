import { NextRequest } from 'next/server';
import app_middleware from "./app/middleware";

export const config = {
    matcher: '/v2/:path*',
}

export default function middleware(req: NextRequest) {
    return app_middleware(req)
};
