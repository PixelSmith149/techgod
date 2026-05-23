import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      reference,
      email,
      product,
    } = body;

    const response = await fetch(

      `https://api.paystack.co/transaction/verify/${reference}`,

      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (
      data.data.status === "success"
    ) {

      const filePath = path.join(
        process.cwd(),
        "data",
        "purchases.json"
      );

      const fileData = fs.readFileSync(
        filePath,
        "utf-8"
      );

      const purchases = JSON.parse(fileData);

      purchases.push({
        email,
        product,
        paid: true,
        date: new Date(),
      });

      fs.writeFileSync(
        filePath,
        JSON.stringify(purchases, null, 2)
      );

      return NextResponse.json({
        success: true,
      });

    }

    return NextResponse.json({
      success: false,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });

  }

}