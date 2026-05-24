import Link from "next/link";
import {
  ShoppingBag,
  ExternalLink,
  Globe,
  Sparkles,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="mt-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <Link
          href="/products"
          className="
            relative overflow-hidden
            rounded-2xl
            bg-green-500
            px-5 py-3
            font-bold
            text-black
            shadow-lg shadow-green-500/30
            transition
            hover:scale-105
            animate-pulse
          "
        >
          Explore Store
        </Link>

      </div>

      {/* ACTIONS - HORIZONTAL STYLE */}

      <div className="flex flex-col gap-4">

        {/* STORE */}
        <Link href="/products">
          <div className="group flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:translate-x-2">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-green-500/10 p-3 text-green-400 group-hover:scale-110 transition">
                <ShoppingBag />
              </div>

              <div>
                <h3 className="font-bold text-lg">View Store</h3>
                <p className="text-sm text-gray-400">Browse premium products</p>
              </div>

            </div>

            <ExternalLink className="text-gray-400" />

          </div>
        </Link>

        {/* SOCIAL GRID (kept but improved spacing) */}

        <div className="grid gap-4 md:grid-cols-4">

          <a href="https://www.youtube.com/@techgod30"
            target="_blank"
            className="rounded-2xl border border-white/10 bg-red-500/20 p-4 text-center font-bold hover:scale-[1.02] transition">
            <Globe className="mx-auto mb-2" />
            Explore YouTube⚡
          </a>

          <a href="https://www.instagram.com/techgod.30"
            target="_blank"
            className="rounded-2xl border border-white/10 bg-pink-500/20 p-4 text-center font-bold hover:scale-[1.02] transition">
           
                <Globe className="mx-auto mb-2" />
            IG DB's😂
          </a>

          <a href="https://www.tiktok.com/@techgod30"
            target="_blank"
            className="rounded-2xl border border-white/10 bg-green-500/20 p-4 text-center font-bold hover:scale-[1.02] transition">
            <Sparkles className="mx-auto mb-2" />
            TikTok-Make Your Day👍
          </a>

          <a href="https://www.facebook.com/share/1DzMXT7Sz5/"
            target="_blank"
            className="rounded-2xl border border-white/10 bg-blue-500/20 p-4 text-center font-bold hover:scale-[1.02] transition">
            <Globe className="mx-auto mb-2" />
            Watch Facebook Reels⚡
          </a>

        </div>

      </div>

    </div>
  );
}