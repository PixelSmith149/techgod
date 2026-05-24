"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_access");
    if (!isAdmin) router.push("/admin/login");
  }, []);

  function go(tab: string) {
    router.push(`/admin/dashboard?tab=${tab}`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-10">
        Admin Control Hub
      </h1>

      <div className="grid md:grid-cols-2 gap-5">

        <button onClick={() => go("analytics")} className="p-6 bg-white/5 rounded-xl">
          📊 View Analytics
        </button>

        <button onClick={() => go("users")} className="p-6 bg-white/5 rounded-xl">
          👥 Manage Users
        </button>

        <button onClick={() => go("products")} className="p-6 bg-white/5 rounded-xl">
          🛒 Manage Products
        </button>

        <button onClick={() => go("purchases")} className="p-6 bg-white/5 rounded-xl">
          💰 Purchases
        </button>

      </div>

    </main>
  );
}