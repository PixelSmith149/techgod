import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = body;

    // ONLY handle successful payments
    if (event.event !== "charge.success") {
      return NextResponse.json({ ok: true });
    }

    const metadata = event.data.metadata;

    const email = metadata.email;
    const product = metadata.product;
    const user_id = metadata.user_id;

    // 🔥 SAVE PURCHASE TO DATABASE
    const { error } = await supabase.from("purchases").insert([
      {
        email,
        user_id,
        product_slug: product,
        reference: event.data.reference,
        amount: event.data.amount,
        status: "paid",
      },
    ]);

    if (error) {
      console.log("DB error:", error);
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.log("Webhook error:", err);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}