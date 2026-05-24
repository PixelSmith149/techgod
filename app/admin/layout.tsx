"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
  const check = async () => {
    const { data } = await supabase.auth.getUser();

  ;

if (!data.user && pathname !== "/admin/login") {
  router.replace("/admin/login");
  return;
}

    setReady(true);
  };

  check();
}, []);

  async function logout() {
    localStorage.clear();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  const navItems = [
    { label: "📊 Analytics", href: "/admin/dashboard?tab=analytics" },
    { label: "👥 Users", href: "/admin/dashboard?tab=users" },
    { label: "🛒 Products", href: "/admin/dashboard?tab=products" },
    { label: "💰 Purchases", href: "/admin/dashboard?tab=purchases" },
  ];

  if (!ready) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 border-b border-white/10 bg-black">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white text-sm"
        >
          ☰ Menu
        </button>

        <span className="font-bold">Admin</span>

        <button onClick={logout} className="text-red-400 text-sm">
          Logout
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-40
          w-64 h-full
          border-r border-white/10
          p-6 bg-black
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        <div className="mb-10">
          <h1 className="text-xl font-bold">⚡ TECH GOD ADMIN</h1>
          <p className="text-xs text-gray-500 mt-1">Control Center</p>
        </div>

        <nav className="space-y-2">

          {navItems.map((item) => {
            const isActive = pathname.includes(item.href.split("?")[0]);

            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-green-500 text-black font-bold"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            );
          })}

        </nav>

        {/* LOGOUT (DESKTOP) */}
        <button
          onClick={logout}
          className="hidden md:block mt-10 w-full text-left px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
        >
          Logout
        </button>

        <div className="mt-auto pt-10 text-xs text-gray-500">
          SaaS Admin v2.0
        </div>

      </aside>

      {/* BACKDROP (MOBILE) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 md:hidden"
        />
      )}

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10 mt-14 md:mt-0 overflow-auto">
        {children}
      </main>

    </div>
  );
}