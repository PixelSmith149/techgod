"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  product: {
    id: string;
    price: number;
  };
}

export default function PayButton({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  async function handlePurchase() {
    try {
      setLoading(true);

      if (!emailAddress || !fullName) {
        alert("Please fill in your name and email before continuing");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress.trim(),
          amount: product.price,
          product: product.id,
          fullName: fullName.trim(),
        }),
      });

      const data = await res.json();

      console.log("PAYSTACK RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data?.message || "Payment init failed");
      }

      const url = data?.data?.authorization_url;

      if (url) {
        window.location.href = url;
      } else {
        console.error("No authorization URL returned:", data);
      }

    } catch (error) {
      console.error("PAYSTACK ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">
          Secure Checkout
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Your payment is protected and verified securely.
        </p>
      </div>

      <input
        type="text"
        placeholder="Your Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="
          mb-4
          w-full
          rounded-2xl
          border border-white/10
          bg-black/40
          px-4 py-3
          text-white
          outline-none
        "
      />

      <input
        type="email"
        placeholder="Your Email Address"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        className="
          mb-4
          w-full
          rounded-2xl
          border border-white/10
          bg-black/40
          px-4 py-3
          text-white
          outline-none
        "
      />

      <button
        onClick={handlePurchase}
        disabled={loading}
        className="
          flex w-full items-center justify-center gap-2
          rounded-2xl
          bg-green-500
          px-5 py-4
          font-bold
          text-black
          transition
          hover:scale-[1.02]
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processing Secure Payment...
          </>
        ) : (
          <>
            <Lock size={18} />
            Pay To Access — GHS {product.price}
          </>
        )}
      </button>
    </div>
  );
}