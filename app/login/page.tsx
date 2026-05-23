"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Magic login link sent to your email");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-gray-400 text-sm">
          Access your premium digital products securely.
        </p>

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none"
        />

        <button
          onClick={login}
          className="mt-5 w-full rounded-2xl bg-green-500 py-4 font-bold text-black"
        >
          Continue
        </button>

      </div>

    </main>
  );
}