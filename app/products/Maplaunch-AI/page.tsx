"use client";

import Link from "next/link";
import { ArrowLeft, Lock, Sparkles, ShieldCheck } from "lucide-react";
import PayButton from "@/components/PayButton";

export default function Maplaunchai() {

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
            Maplaunch AI System
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight">
            Maplaunch AI — Local Business Visibility System
          </h1>

          <p className="mt-4 text-gray-400 leading-8">
            A smart AI-powered system that helps you place your business on Google Maps,
            improve visibility, and attract real customers from local search traffic.
          </p>

        </div>

        {/* HERO IMAGE (REAL FILE SLOT) */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-white/10">
          <img
            src="maplaunch-ai-hero.webp"
            alt="Maplaunch AI Hero Preview"
            className="w-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-8 space-y-6">

          {/* WHAT YOU’LL LEARN (PRESERVED STRUCTURE) */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold">
              What You’ll Learn
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

          {/* BOTTOM IMAGE (REAL FILE SLOT) */}
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <img
              src="/maplaunch-ai-preview.jpg"
              alt="Maplaunch AI System Preview"
              className="w-full object-cover"
            />
          </div>

          {/* PAY BUTTON */}
          <PayButton
            product={{
              id: "maplaunch-ai",
              price: 110,
            }}
          />

          {/* LOCKED MAIN RESOURCE (ONLY SHOWN AS TEASER) */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <Lock size={14} />
            Full system unlocks after payment — includes live deployment dashboard & setup tools
          </div>

          {/* PROTECTED LINK (NOT EXPOSED BEFORE PAYMENT) */}
          <div className="hidden">
            https://maplaunch-ai.netlify.app
          </div>

        </div>

      </div>

    </main>
  );
}