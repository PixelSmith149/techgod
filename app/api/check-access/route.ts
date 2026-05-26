import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, product } = await req.json();

  // 🔐 STRICT MINIMUM REQUIREMENT
  if (!email || !product) {
    return NextResponse.json(
      { access: false },
      { status: 400 }
    );
  }

  // 🔐 CHECK REAL PURCHASE IN DATABASE
  const { data, error } = await supabase
    .from("purchases")
    .select("id")
    .eq("email", email)
    .eq("product", product)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ access: false });
  }

  return NextResponse.json({ access: true });
}