"use client";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      },
    });

    if (error) {
      alert(error.message);
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

        {/* NO EMAIL INPUT NEEDED ANYMORE */}

        <button
          onClick={loginWithGoogle}
          className="mt-6 w-full rounded-2xl bg-white py-4 font-bold text-black"
        >
          Continue with Google
        </button>

      </div>

    </main>
  );
}