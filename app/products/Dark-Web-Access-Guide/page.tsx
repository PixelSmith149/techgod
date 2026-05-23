"use client";

import Link from "next/link";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DarkWebAccessGuide() {
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
        product: "Dark Web Access Guide",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          setAllowed(true);
        } else {
          router.push("/products");
        }
      });
  }, [router]);

  // LOADING STATE (fixed)
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
            Dark Web Access Guide +50 Links
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight">
            Dark Web Access Guide
          </h1>

          <p className="mt-4 text-gray-400 leading-8">
            Learn how to safely navigate the dark web and access exclusive content +50 dark web links and resources.
          </p>

        </div>

        {/* Content */}
        <div className="mt-8 space-y-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold">
              What You’ll Learn
            </h2>

            <ul className="mt-4 space-y-3 text-gray-300">
              <li>• Safe navigation techniques for the dark web</li>
              <li>• Identifying and accessing exclusive content</li>
              <li>• Protecting your identity and privacy</li>
              <li>• Understanding the risks and legal considerations</li>
              <li>• Building a secure online presence</li>
            </ul>

          </div>

          {/* Access Button */}
          <a
            href="https://drive.google.com/drive/folders/1Xo9n8s2l7j3aZt5v6u8w9y0z1b2c3d4?usp=sharing"
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
            Access the Guide
          </a>

        </div>

      </div>

    </main>
  );
}