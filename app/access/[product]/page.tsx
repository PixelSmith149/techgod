"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AccessPage() {
  const { product } = useParams();
  const router = useRouter();

  useEffect(() => {
    checkAccess();
  }, [product]);

  async function checkAccess() {
    const res = await fetch("/api/check-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
      }),
    });

    const data = await res.json();

    if (!data.access) {
      router.push("/products");
      return;
    }

    // redirect to real product page
    router.push(`/products/${product}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Verifying access...
    </div>
  );
}