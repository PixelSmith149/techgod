"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useSearchParams,
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AccessPage() {

  const { product } = useParams();

  const searchParams = useSearchParams();

  const router = useRouter();

  const token = searchParams.get("token");

  const [loading, setLoading] =
    useState(true);

  const [access, setAccess] =
    useState(false);

  useEffect(() => {

    checkAccess();

  }, [product, token]);

  async function checkAccess() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !token || !product) {
      router.push("/products");
      return;
    }

    const email = user.email;

    const res = await fetch(
      "/api/check-access",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          product,
          token,
          user_id: user.id,
        }),
      }
    );

    const data = await res.json();

    setAccess(data.access);

    setLoading(false);

    if (!data.access) {
      router.push("/products");
    }
  }

  if (loading) {
    return (
      <div className="text-white p-10">
        Verifying secure access...
      </div>
    );
  }

  if (!access) return null;

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-2xl font-bold">
        🔓 Premium Access Granted
      </h1>

      <p className="mt-4 text-gray-400">
        Product: {product}
      </p>

      <div className="mt-6 p-6 rounded-xl bg-white/5 border border-white/10">

        <p className="text-gray-300">

          Your premium content is unlocked securely via verified Supabase session + database check.

        </p>

      </div>

      <a
        href="#"
        className="mt-6 inline-block bg-green-500 text-black px-5 py-3 rounded-xl"
      >
        Open Content
      </a>

    </div>
  );
}