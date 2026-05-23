"use client";

import Link from "next/link";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DigitalCreatorPage() {
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
        product: "Digital Product Creator System",
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
            Premium Creator System
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight">
            Digital Product Creator System
          </h1>

          <p className="mt-4 text-gray-400 leading-8">
            Learn how to build, package, launch, market,
            and scale digital products online even as a beginner.
          </p>

        </div>

        {/* Content */}
        <div className="mt-8 space-y-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold">
              What You’ll Learn
            </h2>

            <ul className="mt-4 space-y-3 text-gray-300">
              <li>• Finding profitable digital product ideas</li>
              <li>• Creating ebooks & creator systems</li>
              <li>• Selling without marketplaces</li>
              <li>• Building personal brand authority</li>
              <li>• AI-powered content monetization</li>
            </ul>

          </div>

          {/* Access Button */}
          <a
            href="https://www.notion.so/Digital-Product-Creator-System-1-352b97d71042800ab5c6f38c1511a5df?source=copy_link"
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
            Open Premium System
          </a>

        </div>

      </div>

    </main>
  );
}