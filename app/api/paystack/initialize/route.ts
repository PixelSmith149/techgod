import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, amount, product, user_id } = body;

    // 🔐 STRICT VALIDATION
    if (!email || !amount || !product) {
      return NextResponse.json(
        { status: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔐 ENSURE VALID AMOUNT
    const safeAmount = Number(amount);

    if (isNaN(safeAmount) || safeAmount <= 0) {
      return NextResponse.json(
        { status: false, message: "Invalid amount" },
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
          email: email.trim(),
          amount: Math.round(safeAmount * 100), // kobo conversion
          metadata: {
            email: email.trim(),
            product,
            user_id: user_id || null,
          },
          callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/paystack/verify`,
        }),
      }
    );

    const data = await response.json();

    // 🔐 HARD CHECK PAYSTACK RESPONSE
    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          status: false,
          message: data?.message || "Paystack initialization failed",
        },
        { status: 400 }
      );
    }

    // 🔐 SAFETY CHECK FOR FRONTEND REDIRECT
    if (!data?.data?.authorization_url) {
      return NextResponse.json(
        {
          status: false,
          message: "Missing authorization URL from Paystack",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      data: {
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
      },
    });

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