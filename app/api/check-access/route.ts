import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, key);
}

export async function GET() {
  const supabase = getSupabase();

  // optional example logic (you can replace)
  const { data, error } = await supabase.from("purchases").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}

export async function POST(req: Request) {
  const supabase = getSupabase();

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

  return Response.json({
    access: !!data,
  });
}