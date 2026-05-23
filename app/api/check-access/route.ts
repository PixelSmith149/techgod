import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email, product, token } = await req.json();

  const { data } = await supabase
    .from("purchases")
    .select("*")
    .eq("email", email)
    .eq("product", product)
    .eq("access_token", token)
    .eq("paid", true)
    .maybeSingle();

  return Response.json({
    access: !!data,
  });
}