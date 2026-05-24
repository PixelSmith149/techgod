import Link from "next/link";
import {
  ShoppingBag,
  Download,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function StatsGrid({
  products = [],
}: any) {

  const safeCount = products?.length || 0;

  return (

    <div className="mt-6 grid gap-5 md:grid-cols-4">

      {/* PRODUCTS */}
      <Link href="/products">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:scale-[1.02] cursor-pointer">

          <ShoppingBag />

          <h2 className="mt-4 text-3xl font-bold">
            {safeCount}
          </h2>

          <p className="text-gray-400">
            Products Owned
          </p>

        </div>
      </Link>

      {/* DOWNLOADS */}
      <Link href="/premium-assets">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:scale-[1.02] cursor-pointer">

          <Download />

          <h2 className="mt-4 text-3xl font-bold">
            {safeCount}
          </h2>

          <p className="text-gray-400">
            Downloads Ready
          </p>

        </div>
      </Link>

      {/* STATUS */}
      <Link href="/dashboard/security">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:scale-[1.02] cursor-pointer">

          <ShieldCheck />

          <h2 className="mt-4 text-3xl font-bold text-green-400">
            Active
          </h2>

          <p className="text-gray-400">
            Access Status
          </p>

        </div>
      </Link>

      {/* CLOUD */}
      <Link href="/contact">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:scale-[1.02] cursor-pointer">

          <Clock3 />

          <h2 className="mt-4 text-3xl font-bold">
            24/7
          </h2>

          <p className="text-gray-400">
            Cloud Access
          </p>

        </div>
      </Link>

    </div>
  );
}