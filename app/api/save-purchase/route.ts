import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateToken() {
  return (
    "TG_" +
    Math.random().toString(36).substring(2) +
    Date.now().toString(36)
  );
}

export async function POST(req: Request) {
  const body = await req.json();

  const token = generateToken();

  const { error } = await supabase.from("purchases").insert([
    {
      email: body.email,
      product: body.product,
      reference: body.reference,
      paid: true,
      access_token: token,
      expires_at: null, // optional later
    },
  ]);

  if (error) {
    return Response.json({ success: false, error });
  }

  return Response.json({
    success: true,
    token,
  });
}