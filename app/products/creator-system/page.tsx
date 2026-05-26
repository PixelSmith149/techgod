"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Lock,
  Sparkles,
} from "lucide-react";

import PayButton from "@/components/PayButton";
import { useEffect, useState } from "react";

export default function creatorsystemPage() {

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
          product: "creator-system",
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
            href="/productsPage"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back to Store
          </Link>

          <div className="flex items-center gap-2 text-green-400">
            <Lock size={18} />
            Premium System
          </div>

        </div>

        {/* HERO */}
        <div className="rounded-[32px] border border-green-500/20 bg-gradient-to-br from-green-500/10 via-black to-emerald-500/10 p-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">

            <Sparkles size={16} />

            Digital Product Creator System

          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight">

            Digital Product Creator System

          </h1>

          <p className="mt-4 text-gray-400 leading-8">

            Learn how to build, package, launch, and scale
            profitable digital products online even as a beginner.

          </p>

        </div>

        {/* HERO IMAGE (1st IMAGE SECTION) */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-white/10">

          <Image
            src="/creator-system-hero.png"
            alt="Creator System"
            width={1200}
            height={700}
            className="w-full object-cover"
          />

        </div>

        {/* WHAT YOU'LL LEARN (UNCHANGED STRUCTURE) */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-xl font-semibold">
            What You’ll Learn
          </h2>

          <ul className="mt-4 space-y-3 text-gray-300">

            <li>• Finding profitable digital product ideas</li>
            <li>• Creating ebooks & digital systems</li>
            <li>• Selling without marketplaces</li>
            <li>• Building personal brand authority</li>
            <li>• AI-powered content monetization</li>

          </ul>

        </div>

        {/* WHY THIS WORKS */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-xl font-semibold">
            Why This Works
          </h2>

          <p className="mt-3 text-gray-400 leading-7">

            This system is built for creators who want to turn knowledge into income.
            It focuses on real-world monetization strategies, not theory.

          </p>

        </div>

        {/* SECOND IMAGE (BOTTOM SECTION) */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-white/10">

          <Image
            src="/creator-system-bottom.png"
            alt="Creator System Preview"
            width={1200}
            height={700}
            className="w-full object-cover"
          />

        </div>

        {/* MAIN LOCKED RESOURCE */}
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
              href="https://www.notion.so/Digital-Product-Creator-System-1-352b97d71042800ab5c6f38c1511a5df?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-green-500 px-5 py-3 font-bold text-black hover:scale-[1.02] transition"
            >
              Open Creator System 🚀
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-2xl bg-gray-800 px-5 py-3 text-gray-400 font-bold cursor-not-allowed">
              <Lock size={16} />
              Locked — Complete payment to unlock👇
            </div>
          )}

        </div>

        {/* PAY BUTTON */}
        <PayButton
          product={{
            id: "creator-system",
            price: 140,
          }}
        />

      </div>

    </main>
  );
}