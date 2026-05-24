"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import ProfileHero from "@/components/dashboard/ProfileHero";

import QuickActions from "@/components/dashboard/QuickActions";

import StatsGrid from "@/components/dashboard/StatsGrid";

import ProductLibrary from "@/components/dashboard/ProductLibrary";

import ProfilePreview from "@/components/dashboard/ProfilePreview";

export interface ProductItem {
  product: string;
  access_token: string;
}

export default function DashboardPage() {

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [profileImage, setProfileImage] =
    useState("");

  const [userEmail, setUserEmail] =
    useState("");

  const [userName, setUserName] =
    useState("");

  const [products, setProducts] =
    useState<ProductItem[]>([]);

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function logout() {
  await supabase.auth.signOut();
  localStorage.clear();
  window.location.href = "/";
}

  async function loadDashboard() {
  try {

    const { data, error } =
      await supabase.auth.getUser();

    const user = data?.user;

    if (!user) {
      window.location.href = "/login";
      return;
    }

    // SAFE: user is now in correct scope
    const email = user.email || "";

    setUserEmail(email);
    setUserName(
      user.user_metadata?.full_name || ""
    );
    setProfileImage(
      user.user_metadata?.avatar_url || ""
    );

    const res = await fetch(
      "/api/get-user-products",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );


    const dataRes = await res.json();

    setProducts(dataRes.products || []);

  } catch (err) {
    console.log(err);
  }
}
  return (

    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-6xl">

        <ProfileHero
          profileImage={profileImage}
          userName={userName}
          userEmail={userEmail}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          logout={logout}
          openPreview={() =>
            setPreviewOpen(true)
          }
        />

        <QuickActions />

        <StatsGrid
          products={products}
        />

        <ProductLibrary
          products={products}
        />

      </div>

      <ProfilePreview
        previewOpen={previewOpen}
        profileImage={profileImage}
        closePreview={() =>
          setPreviewOpen(false)
        }
      />

    </main>

  );

}