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
    } = await supabase.auth.getUser(token);

    if (!user) {
      return NextResponse.json({ products: [] });
    }

    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq("email", user.email);

    if (error) {
      return NextResponse.json({ products: [] });
    }

    return NextResponse.json({
      products: data || [],
    });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ products: [] });
  }
}