import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ products: [] });
    }

    const token = authHeader.replace("Bearer ", "");

    // verify user session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ products: [] });
    }

    // fetch purchased products
    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq("email", user.email);

    if (error) {
      console.log("DB error:", error);
      return NextResponse.json({ products: [] });
    }

    return NextResponse.json({
      products: data ?? [],
    });

  } catch (err) {
    console.log("API error:", err);

    return NextResponse.json({
      products: [],
    });
  }
}