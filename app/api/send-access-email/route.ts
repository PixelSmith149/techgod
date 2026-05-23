import { createSupabaseServer } from "@/lib/supabase-server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServer();
    const { email, name, product, link } = await req.json();

    await resend.emails.send({
      from: "TECH GOD Hub <onboarding@resend.dev>",
      to: email,

      subject: `Your Access: ${product} 🎉`,

      html: `
        <div style="font-family: Arial; padding: 20px; background:#000; color:#fff">

          <h1 style="color:#00ff88">TECH GOD Hub</h1>

          <h2>Payment Successful 🎉</h2>

          <p>Hello <b>${name}</b>,</p>

          <p>Thank you for purchasing:</p>

          <h3 style="color:#fff">${product}</h3>

          <p>You now have full access to your digital product.</p>

          <a href="${link}"
             style="
              display:inline-block;
              margin-top:20px;
              padding:12px 20px;
              background:#00ff88;
              color:#000;
              text-decoration:none;
              font-weight:bold;
              border-radius:8px;
             ">
            Access Your Product
          </a>

          <p style="margin-top:30px; font-size:12px; color:#aaa">
            If you didn’t request this, ignore this email.
          </p>

        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    return Response.json({ success: false });
  }
}