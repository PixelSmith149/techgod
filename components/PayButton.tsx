"use client";

import { supabase } from "@/lib/supabase";

interface Props {
  product: any;
}

export default function PayButton({ product }: Props) {

  async function handlePurchase() {
    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch(
        "/api/paystack/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            amount: product.price,
            product: product.name,
          }),
        }
      );

      const data = await res.json();

      if (data?.data?.authorization_url) {
        window.location.href =
          data.data.authorization_url;
      }

    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  }

  return (
    <button
      onClick={handlePurchase}
      className="
        rounded-2xl
        bg-green-500
        px-5 py-3
        font-bold
        text-black
        transition
        hover:scale-[1.02]
      "
    >
      Buy Now
    </button>
  );
}