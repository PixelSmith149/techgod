import { createSupabaseServer } from "@/lib/supabase-server";

export async function POST() {
  const supabase = createSupabaseServer();
  return Response.json({
    success: true,
  });
}