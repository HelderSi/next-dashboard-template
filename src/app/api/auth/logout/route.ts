// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1, // Invalidate the cookie immediately
        path: "/",
        sameSite: "strict",
    });
    return response;
}
