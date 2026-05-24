import {
  ShoppingBag,
  Download,
  ShieldCheck,
  Clock3,
  Link,
} from "lucide-react";

export default function StatsGrid({
  products,
}: any) {

  return (

   
        <div className="mt-6 grid gap-5 md:grid-cols-4">

  <Link href="/products">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:scale-[1.02] cursor-pointer">

      <ShoppingBag />

      <h2 className="mt-4 text-3xl font-bold">
        {products.length}
      </h2>

      <p className="text-gray-400">
        Products Owned
      </p>

    </div>
  </Link>

  <Link href="/premium-assets">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:scale-[1.02] cursor-pointer">

      <Download />

      <h2 className="mt-4 text-3xl font-bold">
        {products.length}
      </h2>

      <p className="text-gray-400">
        Downloads Ready
      </p>

    </div>
  </Link>

  <Link href="/dashboard/security">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:scale-[1.02] cursor-pointer">

      <ShieldCheck />

      <h2 className="mt-4 text-3xl font-bold">
        Active
      </h2>

      <p className="text-gray-400">
        Access Status
      </p>

    </div>
  </Link>

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