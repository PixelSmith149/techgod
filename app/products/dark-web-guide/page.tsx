"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import PayButton from "@/components/PayButton";
import { useEffect, useState } from "react";

export default function darkwebguidePage() {
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
          product: "dark-web-access-guide",
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
    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-3xl">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-10">

          <Link
            href="/products"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back to Store
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

        {/* PRODUCT IMAGE */}
        <div className="mt-6 rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="/dark-web-guide.webp"
            alt="Dark Web Access Guide"
            width={1200}
            height={700}
            className="w-full object-cover"
          />
        </div>

        {/* WHAT YOU'LL LEARN */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

          <h2 className="text-xl font-bold">What You Will Learn</h2>

          <div className="mt-4 space-y-4 text-gray-300">

            <div className="rounded-2xl border border-white/10 p-4">
              1. Safe browsing fundamentals on hidden networks
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              2. How anonymity tools like Tor work
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              3. Onion routing and hidden services explained
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              4. Risk awareness and scam prevention
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              5. Digital identity protection strategies
            </div>

          </div>

        </div>

        {/* MAIN RESOURCE (ONLY LOCKED SECTION) */}
        <div className="mt-6">

          <h2 className="text-xl font-bold mb-3">Main Resource</h2>

          <p className="text-gray-400 text-sm mb-4">
            Full guide access +50 dark web links is available below.
          </p>

          {loadingAccess ? (
            <div className="text-gray-400">Checking access...</div>
          ) : hasAccess ? (
            <a
              href="https://darkweb-access-guide.linkyhost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-green-500 px-5 py-3 font-bold text-black hover:scale-[1.02] transition"
            >
              Dark Web Resources And Tools⚙️
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
            id: "dark-web-access-guide",
            price: 44,
          }}
        />

      </div>

    </main>
  );
}