import Link from "next/link";

import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Download,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

const assets = [
  {
    title: "Digital Product Creator System",
    desc: "Advanced creator business system for beginners and professionals.",
    category: "Business System",
  },

  {
    title: "MapLaunch AI",
    desc: "AI-powered business listing optimization platform.",
    category: "AI Tool",
  },

  {
    title: "Dark Web Access Guide",
    desc: "Premium educational privacy & deep web research guide.",
    category: "Guide",
  },
];

export default function PremiumAssetsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-6xl">

        {/* TOP BAR */}

        <div className="flex items-center justify-between">

          <Link
            href="/dashboard"
            className="
              flex items-center gap-2
              text-gray-400
              hover:text-white
              transition
            "
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>

          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-green-500/20
              bg-green-500/10
              px-4 py-2
              text-sm text-green-300
            "
          >
            <ShieldCheck size={16} />
            Premium Access
          </div>

        </div>

        {/* HERO */}

        <div
          className="
            relative mt-8 overflow-hidden
            rounded-[32px]
            border border-white/10
            bg-gradient-to-br
            from-green-500/10
            via-black
            to-emerald-500/5
            p-8
          "
        >

          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative z-10">

            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-green-500/20
                bg-green-500/10
                px-4 py-2
                text-sm text-green-300
              "
            >
              <Sparkles size={16} />
              Premium Assets Library
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Your Premium Digital Assets
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400 leading-7">
              Access your secured creator systems, business tools,
              downloadable files, premium resources and exclusive
              digital products.
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <ShoppingBag className="text-green-400" />

            <h2 className="mt-4 text-3xl font-bold">
              3
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Premium Products
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <Download className="text-green-400" />

            <h2 className="mt-4 text-3xl font-bold">
              Unlimited
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Secure Access
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <ShieldCheck className="text-green-400" />

            <h2 className="mt-4 text-3xl font-bold">
              Active
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Membership Status
            </p>

          </div>

        </div>

        {/* ASSETS */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {assets.map((asset, index) => (

            <div
              key={index}
              className="
                rounded-3xl
                border border-white/10
                bg-gradient-to-br
                from-white/[0.05]
                to-black
                p-6
                hover:border-green-500/30
                transition
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <div
                    className="
                      inline-flex rounded-full
                      bg-green-500/10
                      px-3 py-1
                      text-xs text-green-300
                    "
                  >
                    {asset.category}
                  </div>

                  <h2 className="mt-4 text-2xl font-bold">
                    {asset.title}
                  </h2>

                </div>

                <div
                  className="
                    rounded-2xl
                    bg-green-500/10
                    p-3
                    text-green-400
                  "
                >
                  <ShoppingBag size={20} />
                </div>

              </div>

              <p className="mt-4 leading-7 text-gray-400">
                {asset.desc}
              </p>

              <div className="mt-6 flex gap-3">

                <Link
                  href="/products"
                  className="
                    flex items-center gap-2
                    rounded-2xl
                    bg-green-500
                    px-5 py-3
                    font-bold
                    text-black
                    hover:scale-[1.02]
                    transition
                  "
                >

                  Open Product

                  <ExternalLink size={16} />

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}