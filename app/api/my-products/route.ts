import { createSupabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {

  const supabase = createSupabaseServer();

  const { email } = await req.json();

  const { data } = await supabase
    .from("purchases")
    .select("*")
    .eq("email", email);

  return Response.json({
    products: data || [],
  });
}