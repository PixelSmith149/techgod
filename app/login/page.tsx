"use client";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const loginWithGoogle = async () => {

  const { error } =
    await supabase.auth.signInWithOAuth({

      provider: "google",

      options: {

        redirectTo:
          `${window.location.origin}/auth/callback`,

      },

    });

  if (error) {

    alert(error.message);

  }

};

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5">

        <h1 className="text-3xl font-bold">Login</h1>

        <p className="text-gray-400 mt-2">
          Sign in with Google to continue
        </p>

        <button
          onClick={loginWithGoogle}
          className="mt-6 w-full bg-white text-black py-4 rounded-xl font-bold"
        >
          Sign in with Google
        </button>

      </div>

    </main>
  );
}