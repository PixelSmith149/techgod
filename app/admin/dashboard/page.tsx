"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "analytics";

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const totalRevenue = purchases.reduce((sum, p) => {
    return sum + (Number(p.price || 0));
  }, 0);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || data?.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    loadData();
  }

  async function loadData() {
    const [u, p, pur] = await Promise.all([
      supabase.from("users").select("*"),
      supabase.from("products").select("*"),
      supabase.from("purchases").select("*"),
    ]);

    setUsers(u.data || []);
    setProducts(p.data || []);
    setPurchases(pur.data || []);
    setLoading(false);
  }

  async function createProduct() {
    if (!newProduct) return;

    await supabase.from("products").insert({
      name: newProduct,
      price: newPrice || 0,
    });

    setNewProduct("");
    setNewPrice("");
    loadData();
  }

  if (loading) {
    return (
      <div className="text-white p-10">
        Verifying admin access...
      </div>
    );
  }

    return (
  <main className="min-h-screen bg-black text-white flex">

      <h1 className="text-xl font-bold mb-8">
        ⚡ TECH GOD ADMIN
      </h1>

      <nav className="space-y-3">

        {[
          ["analytics", "📊 Analytics"],
          ["users", "👥 Users"],
          ["products", "🛒 Products"],
          ["purchases", "💰 Purchases"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => router.push(`/admin/dashboard?tab=${key}`)}
            className={`w-full text-left p-3 rounded-xl transition ${
              tab === key
                ? "bg-green-500 text-black font-bold"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        ))}

      </nav>




    {/* MAIN */}
    <section className="flex-1 p-6 md:p-10 overflow-auto">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Real-time control panel
          </p>
        </div>

        <div className="text-sm text-gray-400">
          Total Revenue:{" "}
          <span className="text-green-400 font-bold">
            ${totalRevenue}
          </span>
        </div>

      </div>

      {/* ANALYTICS */}
      {tab === "analytics" && (
        <div className="grid md:grid-cols-3 gap-5">

          {[
            ["Users", users.length],
            ["Products", products.length],
            ["Purchases", purchases.length],
          ].map(([label, value]) => (
            <div
              key={label}
              className="p-6 bg-white/5 rounded-2xl border border-white/10"
            >
              <p className="text-gray-400">{label}</p>
              <h2 className="text-3xl font-bold mt-2">{value}</h2>
            </div>
          ))}

        </div>
      )}

      {/* USERS */}
      {tab === "users" && (
        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 bg-white/5 rounded-xl flex justify-between"
            >
              <span>{u.email}</span>
              <span className="text-gray-400 text-sm">
                {u.role || "user"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* PRODUCTS */}
      {tab === "products" && (
        <div>

          {/* CREATE PRODUCT */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">

            <input
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="Product name"
              className="p-3 rounded-xl bg-white/5 border border-white/10 flex-1"
            />

            <input
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Price"
              type="number"
              className="p-3 rounded-xl bg-white/5 border border-white/10 w-full md:w-40"
            />

            <button
              onClick={createProduct}
              className="px-5 py-3 bg-green-500 text-black rounded-xl font-bold hover:scale-[1.02] transition"
            >
              Add Product
            </button>

          </div>

          {/* PRODUCT GRID */}
          <div className="grid md:grid-cols-2 gap-4">

            {products.map((p) => (
              <div
                key={p.id}
                className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-green-500/30 transition"
              >
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-gray-400">${p.price}</p>
              </div>
            ))}

          </div>

        </div>
      )}

      {/* PURCHASES */}
      {tab === "purchases" && (
        <div className="space-y-3">

          {purchases.map((p, i) => (
            <div
              key={i}
              className="p-4 bg-white/5 rounded-xl flex justify-between"
            >
              <div>
                <p>{p.email}</p>
                <p className="text-gray-400 text-sm">{p.product}</p>
              </div>

              <span className="text-green-400 text-sm">
                +${p.price || 0}
              </span>
            </div>
          ))}

        </div>
      )}

    </section>

  </main>
);
}