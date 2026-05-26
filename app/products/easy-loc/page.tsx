"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Lock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import PayButton from "@/components/PayButton";
import { useEffect, useState } from "react";

export default function easylocPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const [loadingAccess, setLoadingAccess] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    try {
      const res = await fetch("/api/check-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "",
          product: "easy-loc",
        }),
      });

      const data = await res.json();
      setHasAccess(Boolean(data.access));
    } catch (err) {
      setHasAccess(false);
    } finally {
      setLoadingAccess(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-5 py-10">
      <div className="mx-auto max-w-4xl">

        {/* TOP NAV */}
        <div className="flex items-center justify-between mb-10">

          <Link
            href="/products"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back to Store
          </Link>

          <div className="flex items-center gap-2 text-green-400 animate-pulse">
            <ShieldCheck size={18} />
            Protected System Access
          </div>

        </div>

        {/* HERO */}
        <div className="rounded-[32px] border border-green-500/20 bg-gradient-to-br from-green-500/10 via-black to-emerald-500/10 p-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">

            <Sparkles size={16} />
            Easy LOC System
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight">
            Easy LOC — Local Business Visibility System
          </h1>

          <p className="mt-4 text-gray-400 leading-8">
            A smart AI-powered system that helps you place your business on Google Maps,
            improve visibility, and attract real customers from local search traffic.
          </p>

        </div>

        {/* HERO IMAGE */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="/maplaunch-ai-hero.webp"
            alt="Maplaunch AI Hero Preview"
            width={1600}
            height={900}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="mt-8 space-y-6">

          {/* WHAT YOU’LL ACCESS */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold">
              What You’ll Access
            </h2>

            <ul className="mt-4 space-y-3 text-gray-300">

              <li>• How to instantly list your business on Google Maps</li>
              <li>• How to rank higher in local search results</li>
              <li>• How AI improves business discovery & visibility</li>
              <li>• How to convert map traffic into paying customers</li>

            </ul>

          </div>

          {/* WHY THIS WORKS */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold">
              Why This Works
            </h2>

            <p className="mt-3 text-gray-400 leading-7">

              This system works because it focuses on real search intent.
              People already searching for businesses are converted into customers automatically
              when your listing is properly optimized.

            </p>

          </div>

          {/* BOTTOM IMAGE */}
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="/maplaunch-ai-preview.jpg"
              alt="Maplaunch AI System Preview"
              width={1600}
              height={900}
              className="w-full object-cover"
            />
          </div>

          {/* PAY BUTTON */}
          <PayButton
            product={{
              id: "easy-loc",
              price: 110,
            }}
          />

          {/* LOCKED RESOURCE (NOW PROTECTED LIKE YOUR SECOND FILE) */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">
              Main Resource
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              Full system access is available below.
            </p>

            {loadingAccess ? (
              <div className="text-gray-400">Checking access...</div>
            ) : hasAccess ? (
              <a
                href="https://maplaunch-ai.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-2xl bg-green-500 px-5 py-3 font-bold text-black hover:scale-[1.02] transition"
              >
                Open Easy LOC 🚀
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-gray-800 px-5 py-3 text-gray-400 font-bold cursor-not-allowed">
                <Lock size={16} />
                Locked — Complete payment to unlock👇
              </div>
            )}

          </div>

          {/* LOCKED RESOURCE */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <Lock size={14} />
            Full system unlocks after payment — includes live deployment dashboard & setup tools
          </div>

          {/* PROTECTED LINK */}
          <div className="hidden">
            https://maplaunch-ai.netlify.app
          </div>

        </div>

      </div>
    </main>
  );
}