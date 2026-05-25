import { NextResponse } from "next/server";
import crypto from "crypto";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);

    const reference =
      searchParams.get("reference");

    if (!reference) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      );
    }

    // VERIFY PAYMENT
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const result = await response.json();

    const payment = result?.data;

    if (
      !payment ||
      payment.status !== "success"
    ) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      );
    }

    const email = payment.customer.email;

    const product =
      payment.metadata?.product || "Premium Product";

    // GENERATE SECURE TOKEN
    const access_token =
      crypto.randomBytes(32).toString("hex");

    // PREVENT DUPLICATE PURCHASES
    const { data: existing } = await supabase
      .from("purchases")
      .select("*")
      .eq("email", email)
      .eq("product", product)
      .single();

    if (!existing) {

      await supabase.from("purchases").insert({
        email,
        product,
        access_token,
        price: payment.amount / 100,
      });

    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
    );

  } catch (err) {

    console.log(err);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
    );
  }
}