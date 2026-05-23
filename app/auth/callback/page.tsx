"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    };

    handleAuth();
  }, [router]);

  return <p>Signing you in...</p>;
}