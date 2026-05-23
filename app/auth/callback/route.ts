import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const origin = url.origin;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // ✅ PKCE flow
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // safety: remove hash if fallback ever happens
  return NextResponse.redirect(`${origin}/dashboard`);
}