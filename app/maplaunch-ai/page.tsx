"use client";

import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, Zap } from "lucide-react";

export default function MapLaunchAI() {
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
            MapLaunch AI
          </h1>

          <p className="mt-5 text-gray-400 leading-relaxed">
            An automated MVP system that helps businesses, freelancers, and entrepreneurs
            optimize their Google presence and attract real customers from search engines.
          </p>

        </div>

        {/* CONTENT */}
        <div className="mt-8 grid gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-bold">Main System</h2>

            <p className="mt-3 text-gray-400 text-sm">
              Access your AI-powered business optimization system below.
            </p>

            <a
              href="https://maplaunch.netlify.app/"
              target="_blank"
              className="mt-5 inline-flex rounded-2xl bg-green-500 px-5 py-3 font-bold text-black hover:scale-[1.02] transition"
            >
              Launch MapLaunch AI
            </a>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-bold">What This Does</h2>

            <p className="mt-3 text-gray-400 text-sm leading-7">
              • Auto business listing optimization  
              • Google search visibility boost  
              • Local customer attraction system  
              • SEO automation workflow  
              • No-code business growth engine  
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}