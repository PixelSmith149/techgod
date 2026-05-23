import { createSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const supabase = createSupabase();

  const { email, product, token } = await req.json();

  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("email", email)
    .eq("product", product)
    .eq("access_token", token)
    .eq("paid", true)
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ access: !!data });
}