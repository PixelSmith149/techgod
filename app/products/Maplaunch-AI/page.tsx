"use client";
import Link from "next/link";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MapLaunchPage() {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("user_email");

    if (!email) {
      router.push("/products");
      return;
    }

    fetch("/api/check-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        product: "MapLaunch AI",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) setAllowed(true);
        else router.push("/products");
      });
  }, [router]);

  if (!allowed) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Checking access...
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-3xl">

        {/* Top */}
        <div className="flex items-center justify-between mb-10">

          <Link
            href="/products"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <div className="flex items-center gap-2 text-green-400">
            <Lock size={18} />
            Protected Access
          </div>

        </div>

        {/* Hero */}
        <div className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-black p-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
            <Sparkles size={16} />
            A system built to place your business on a map with ease
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight">
            Maplaunch AI
          </h1>

          <p className="mt-4 text-gray-400 leading-8">
            A powerful AI-driven system designed to effortlessly place your business on the map, ensuring maximum visibility and growth.
          </p>

        </div>

        {/* Content */}
        <div className="mt-8 space-y-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold">
              What You’ll Gain Access To
            </h2>

            <ul className="mt-4 space-y-3 text-gray-300">
              <li>• Automatic Google Maps business listing workflow</li>
              <li>• Built-in visibility optimization structure</li>
              <li>• Real-time tracking of listing status</li>
              <li>• Step-by-step submission system (no confusion, no tech skills needed)</li>
              <li>• Designed for fast setup and instant deployment</li>
            </ul>

          </div>

          {/* Access Button */}
          <a
            href="https://maplaunch.netlify.app/"
            target="_blank"
            className="
              flex items-center justify-center
              rounded-2xl
              bg-gradient-to-r
              from-green-500
              to-emerald-600
              px-6 py-4
              font-bold text-black
              transition hover:scale-[1.02]
            "
          >
            Launch Your Business on the Map
          </a>

        </div>

      </div>

    </main>
  );
}