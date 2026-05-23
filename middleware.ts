import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ONLY protect admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  // allow everything else (including dashboard, login, auth callback)
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // simple admin auth check (your localStorage system cannot be checked here server-side properly)
  // so for now just allow access OR later replace with Supabase admin session

  const adminSession = req.cookies.get("admin_access");

  if (!adminSession) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

// IMPORTANT: only match admin routes
export const config = {
  matcher: ["/admin/:path*"],
};