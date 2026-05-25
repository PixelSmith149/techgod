"use client";

import { useEffect } from "react";

export default function PaymentSuccess() {

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-4xl font-bold text-green-400">
          Payment Successful ✅
        </h1>

        <p className="mt-4 text-gray-400">
          Redirecting to dashboard...
        </p>

      </div>

    </main>
  );
}