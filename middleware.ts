import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ONLY protect these routes
  const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/access",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // allow everything else normally
  if (!isProtected) {
    return NextResponse.next();
  }

  // check Supabase auth cookie
  const hasSession =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("sb-refresh-token");

  // if not logged in
  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/access/:path*"],
};