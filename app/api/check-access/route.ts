import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, product, token, user_id } =
    await req.json();

  if (!email || !product || !user_id || !token) {
    return NextResponse.json(
      { access: false },
      { status: 400 }
    );
  }

  // 🔐 STRICT DB MATCH (NO EMAIL RELIANCE)
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", user_id)
    .eq("product", product)
    .eq("access_token", token)
    .single();

  if (error || !data) {
    return NextResponse.json({ access: false });
  }

  return NextResponse.json({ access: true });
}