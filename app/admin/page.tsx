"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    revenue: 0,
  });

  useEffect(() => {

  const adminEmail =
    localStorage.getItem("admin_email");

  if (!adminEmail) {

    window.location.href = "/dashboard";
    return;

  }

  loadStats();

}, []);

  async function loadStats() {

  try {

    const users = await supabase
      .from("users")
      .select("*", {
        count: "exact",
        head: true,
      });

    const products = await supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      });

    const purchases = await supabase
      .from("purchases")
      .select("amount");

    const revenue =
      purchases.data?.reduce(
        (sum: number, p: any) =>
          sum + (p.amount || 0),
        0
      ) || 0;

    setStats({
      users: users.count || 0,
      products: products.count || 0,
      revenue,
    });

  } catch (error) {

    console.log(error);

  }

}

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        <div className="p-5 bg-white/5 rounded-2xl">
          <p className="text-gray-400">Users</p>
          <h2 className="text-2xl font-bold">{stats.users}</h2>
        </div>

        <div className="p-5 bg-white/5 rounded-2xl">
          <p className="text-gray-400">Products</p>
          <h2 className="text-2xl font-bold">{stats.products}</h2>
        </div>

        <div className="p-5 bg-white/5 rounded-2xl">
          <p className="text-gray-400">Revenue</p>
          <h2 className="text-2xl font-bold">${stats.revenue}</h2>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <Link href="/admin/products" className="p-5 bg-green-500 text-black rounded-2xl font-bold">
          Manage Products
        </Link>

        <Link href="/admin/users" className="p-5 bg-white/10 rounded-2xl">
          View Users
        </Link>

        <Link href="/admin/analytics" className="p-5 bg-white/10 rounded-2xl">
          Analytics
        </Link>
      </div>
    </main>
  );
}