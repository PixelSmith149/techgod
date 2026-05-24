import {
  ShoppingBag,
  Download,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function StatsGrid({
  products,
}: any) {

  return (

    <div className="mt-8 grid gap-5 md:grid-cols-4">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <ShoppingBag />
        <h2 className="mt-4 text-3xl font-bold">
          {products.length}
        </h2>
        <p className="text-gray-400">
          Products Owned
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <Download />
        <h2 className="mt-4 text-3xl font-bold">
          {products.length}
        </h2>
        <p className="text-gray-400">
          Downloads Ready
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <ShieldCheck />
        <h2 className="mt-4 text-3xl font-bold">
          Active
        </h2>
        <p className="text-gray-400">
          Access Status
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <Clock3 />
        <h2 className="mt-4 text-3xl font-bold">
          24/7
        </h2>
        <p className="text-gray-400">
          Cloud Access
        </p>
      </div>

    </div>

  );

}