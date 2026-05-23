"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Lock,
  ShieldCheck,
  CreditCard,
  Globe,
  User,
  Mail,
} from "lucide-react";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

interface Product {
  id: string;
  name: string;
  price: number;
  link: string;
}

export default function PayButton({
  product,
}: {
  product: Product;
}) {
  const [loading, setLoading] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerCountry, setCustomerCountry] = useState("");

  const handlePayment = () => {
    if (!customerName || !customerEmail || !customerCountry) {
      alert("Please complete all customer details");
      return;
    }

    // 🛡️ SAFE CHECK: Paystack script loaded?
    if (!window.PaystackPop) {
      alert("Payment system not ready. Please refresh the page.");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: "pk_live_96a56614919deb8370256cee426d38b6b628846f",

      email: customerEmail,

      // FIX: Paystack expects kobo (NGN). If using USD backend must support it.
      amount: Math.round(product.price * 100),

      currency: "USD",

      ref: "TECHGOD_" + Math.floor(Math.random() * 1000000000),

      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customerName,
          },
          {
            display_name: "Customer Country",
            variable_name: "customer_country",
            value: customerCountry,
          },
        ],
      },

        callback: async function (response: any) {
  try {
    const verify = await fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference: response.reference,
        email: customerEmail,
        product: product.name,
      }),
    });

    const data = await verify.json();

    setLoading(false);

    if (data.success) {

        await supabase.from("purchases").insert({
  email: customerEmail,
  product_id: product.id,
  reference: response.reference,
  amount: product.price,
  status: "success"
});

  const { data: accessData, error: accessError } = await supabase.from("access_grants").insert({}).select();

  if (accessError || !accessData || accessData.length === 0) {
    alert("Access creation failed");
  } else {
    const token = accessData[0].id || accessData[0].token;
    window.location.href =
      `/access/${encodeURIComponent(product.name)}?token=${token}`;
  }

}

  } catch (error) {
    setLoading(false);
    alert("Something went wrong");
  }
},

      onClose: function () {
        setLoading(false);
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="space-y-4">

      {/* CUSTOMER FORM */}
      <div className="space-y-3">

        {/* NAME */}
        <div className="relative">
          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Your Full Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 text-sm text-white outline-none backdrop-blur-lg transition focus:border-green-500 focus:bg-black/60"
          />
        </div>

        {/* EMAIL */}
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="email"
            placeholder="Your Email Address"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 text-sm text-white outline-none backdrop-blur-lg transition focus:border-green-500 focus:bg-black/60"
          />
        </div>

        {/* COUNTRY */}
        <div className="relative">
          <Globe
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Your Country"
            value={customerCountry}
            onChange={(e) => setCustomerCountry(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 text-sm text-white outline-none backdrop-blur-lg transition focus:border-green-500 focus:bg-black/60"
          />
        </div>
      </div>

      {/* PAYMENT INFO */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Secure Payment</p>
            <h3 className="mt-1 text-lg font-bold text-green-400">
              ${product.price.toFixed(2)}
            </h3>
          </div>

          <div className="rounded-full bg-green-500/10 p-3 text-green-400">
            <CreditCard size={20} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheck size={14} />
          Verified & secured by Paystack
        </div>
      </div>

      {/* PAY BUTTON */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-4 font-bold text-black shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
      >
        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-white/10" />

        <span className="relative flex items-center justify-center gap-2">
          <Lock size={18} />
          {loading
            ? "Processing Secure Payment..."
            : `Pay $${product.price.toFixed(2)} To Access`}
        </span>
      </button>
    </div>
  );
}