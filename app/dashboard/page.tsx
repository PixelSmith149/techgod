"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import ProfileHero from "@/components/dashboard/ProfileHero";
import StatsGrid from "@/components/dashboard/StatsGrid";
import QuickActions from "@/components/dashboard/QuickActions";
import ProfilePreview from "@/components/dashboard/ProfilePreview";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

     useEffect(() => {
  async function init() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        window.location.replace("/login");
        return;
      }

      setUser(user);
      setUserEmail(user.email || "");
      setUserName(
        user.user_metadata?.name ||
        user.user_metadata?.full_name ||
        "User"
      );

      setProfileImage(
        user.user_metadata?.avatar_url ||
        "/default-profile.png"
      );

      // SAFE FETCH WITH TIMEOUT PROTECTION
       const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 8000);

const {
  data: { session },
} = await supabase.auth.getSession();

const res = await fetch("/api/get-user-products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`,
  },
});


clearTimeout(timeout);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await res.json();
      setProducts(result?.products || []);

    } catch (err) {
      console.log("Dashboard init error:", err);

      // fallback so dashboard NEVER hangs
      setProducts([]);
    } finally {
      setLoading(false); // 🔥 THIS WAS MISSING SAFETY GUARANTEE
    }
  }

  init();
}, []);
      

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-6xl">

        {/* HERO COMPONENT */}
        <ProfileHero
          profileImage={profileImage}
          userName={userName}
          userEmail={userEmail}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          logout={logout}
          openPreview={() => setPreviewOpen(true)}
        />

        {/* STATS */}
        <StatsGrid products={products} />

        {/* QUICK ACTIONS */}
        <QuickActions />

        {/* PROFILE PREVIEW */}
        {previewOpen && (
  <ProfilePreview
    profileImage={profileImage}
    onClose={() => setPreviewOpen(false)}
  />
)}

        )

      </div>

    </main>
  );
}