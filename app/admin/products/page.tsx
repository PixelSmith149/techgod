"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }

  async function updateProduct(id: string, field: string, value: any) {
    await supabase.from("products").update({ [field]: value }).eq("id", id);
    loadProducts();
  }

  return (
    <main className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      {products.map((p) => (
        <div key={p.id} className="p-5 bg-white/5 rounded-2xl mb-4">
          <input
            value={p.title}
            onChange={(e) => updateProduct(p.id, "title", e.target.value)}
            className="w-full bg-transparent text-xl font-bold"
          />

          <input
            value={p.price}
            onChange={(e) => updateProduct(p.id, "price", e.target.value)}
            className="mt-2 bg-black/50 p-2 rounded w-full"
          />

          <input
            value={p.download_link}
            onChange={(e) => updateProduct(p.id, "download_link", e.target.value)}
            className="mt-2 bg-black/50 p-2 rounded w-full"
          />
        </div>
      ))}
    </main>
  );
}