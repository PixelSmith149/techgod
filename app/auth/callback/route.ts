import { createServerClient } from "@supabase/ssr";

import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const requestUrl = new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  if (code) {

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            cookieStore.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

    await supabase.auth.exchangeCodeForSession(
      code
    );
     const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return NextResponse.redirect(new URL("/login", request.url));
}

// 1. UPSERT USER
await supabase.from("users").upsert({
  id: user.id,
  email: user.email,
  full_name: user.user_metadata?.full_name,
  avatar_url: user.user_metadata?.avatar_url,
  provider: user.app_metadata?.provider,
});

// 2. LINK OLD PURCHASES
await supabase
  .from("purchases")
  .update({ user_id: user.id })
  .eq("user_id", user.id)

    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
    } else {

    return NextResponse.redirect(
      new URL("/login", request.url)
    )
    };

}