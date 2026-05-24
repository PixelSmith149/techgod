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
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        window.location.href = "/login";
        return;
      }

      const u = data.user;

      setUser(u);
      setUserEmail(u.email || "");
      setUserName(u.user_metadata?.name || "User");
      setProfileImage(u.user_metadata?.avatar_url || "/default-profile.png");

      const res = await fetch("/api/get-user-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: u.email }),
      });

      const result = await res.json();

      setProducts(result?.products || []);
      setLoading(false);
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