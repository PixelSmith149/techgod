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
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      );
    }

    // 🔐 1. CHECK IF ALREADY PROCESSED (IDEMPOTENCY GUARD)
    const { data: alreadyProcessed } = await supabase
      .from("purchases")
      .select("id")
      .eq("reference", reference)
      .maybeSingle();

    if (alreadyProcessed) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      );
    }

    // 🔐 2. VERIFY WITH PAYSTACK
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const result = await response.json();
    const payment = result?.data;

    // 🔐 STRICT CHECK
    if (!result.status || payment?.status !== "success") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      );
    }

    // 🔐 HARD VALIDATION
    if (!payment?.customer?.email || !payment?.metadata?.product) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      );
    }

    const email = payment.customer.email;
    const product = payment.metadata.product;

    // 🔐 AMOUNT SAFETY CHECK (IMPORTANT)
    const expectedAmount = payment.amount / 100;

    if (expectedAmount <= 0) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      );
    }

    // 🔐 CREATE SECURE TOKEN
    const access_token = crypto.randomBytes(32).toString("hex");

    // 🔐 INSERT (ATOMIC SAFE WRITE)
    const { error: insertError } = await supabase.from("purchases").insert({
      email,
      product,
      reference, // IMPORTANT UNIQUE KEY
      access_token,
      price: expectedAmount,
      currency: payment.currency || "GHS",
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.log("Insert error:", insertError);

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      );
    }

    // 🔐 FINAL REDIRECT
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
    );

  } catch (err) {
    console.log("VERIFY ERROR:", err);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
    );
  }
}