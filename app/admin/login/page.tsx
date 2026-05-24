"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?admin=true`,
      },
    });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5">

        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-gray-400 text-sm mt-2">
          Secure admin access via Google
        </p>

        <button
          onClick={loginWithGoogle}
          className="mt-6 w-full bg-white text-black font-bold py-4 rounded-xl"
        >
          Continue with Google
        </button>

      </div>

    </main>
  );
}