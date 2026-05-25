import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { email, amount, product } = body;

    // VALIDATION
    if (!email || !amount || !product) {
      return NextResponse.json(
        {
          status: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,

          // PAYSTACK USES KOBO/PESAWAS
          amount: Number(amount) * 100,

          callback_url:
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/paystack/verify`,

          metadata: {
            product,
          },
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);

  } catch (err) {

    console.log("Paystack Init Error:", err);

    return NextResponse.json(
      {
        status: false,
        message: "Payment initialization failed",
      },
      { status: 500 }
    );
  }
}