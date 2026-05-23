"use client";

import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, Sparkles } from "lucide-react";

export default function DarkWebAccessGuide() {
  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-3xl">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-10">

          <Link
            href="/products"
            className="text-gray-400 hover:text-white transition"
          >
            <ArrowLeft />
          </Link>

          <div className="flex items-center gap-2 text-green-400 text-sm">

            <ShieldCheck size={16} />
            Protected Access

          </div>

        </div>

        {/* HERO */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-8">

          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400 text-sm">

            <Lock size={15} />
            Premium Product

          </div>

          <h1 className="mt-5 text-4xl font-bold">
            Dark Web Access Guide
          </h1>

          <p className="mt-5 text-gray-400 leading-relaxed">
            A complete beginner-friendly system explaining how the dark web works,
            how to access it safely for educational purposes, and how to protect your identity online.
          </p>

        </div>

        {/* CONTENT */}
        <div className="mt-8 grid gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-bold">Main Resource</h2>

            <p className="mt-3 text-gray-400 text-sm">
              Full guide access +50 dark web links is available below.
            </p>

            <a
              href="https://docs.google.com/document/d/1qyB9J01nWN8gh1OcF10kMvZOynNxh1RccNqGMhvQeLo/edit?tab=t.0#heading=h.wuoz0j9b0bbm/"
              target="_blank"
              className="mt-5 inline-flex rounded-2xl bg-green-500 px-5 py-3 font-bold text-black hover:scale-[1.02] transition"
            >
              Access Dark Web Guide
            </a>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-bold">What You’ll Learn</h2>

            <p className="mt-3 text-gray-400 text-sm leading-7">
              • Safe browsing fundamentals  
              • Privacy and anonymity tools  
              • Understanding hidden networks  
              • Risk awareness and safety rules  
              • Digital identity protection strategies  
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}