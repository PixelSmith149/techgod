import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/admin", "/access"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ❌ NEVER block auth routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth/callback")
  ) {
    return NextResponse.next();
  }

  if (!isProtected) {
    return NextResponse.next();
  }

  // ⚠️ SAFE: let Supabase client handle session
  const session = req.cookies.get("sb-access-token");

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/access/:path*"],
};