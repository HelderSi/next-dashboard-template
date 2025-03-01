// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("session");
    const isAuthRoute = request.nextUrl.pathname.startsWith("/login");

    // Redirect unauthenticated users trying to access the dashboard (root route)
    if (!session && !isAuthRoute) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from the login page
    if (session && isAuthRoute) {
        const dashboardUrl = new URL("/", request.url);
        return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login"],
};
