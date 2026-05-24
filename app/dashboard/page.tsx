"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ShoppingBag,
  Download,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  LogOut,
  Mail,
  Clock3,
  Moon,
  Camera,
  Settings,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

interface ProductItem {
  product: string;
  access_token: string;
}

export default function DashboardPage() {

  const [previewOpen, setPreviewOpen] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [products, setProducts] = useState<ProductItem[]>([]);

  const [darkMode, setDarkMode] = useState(true);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function initializeDashboard() {
      try {

        const { data } = await supabase.auth.getUser();

        if (!data?.user) {
          window.location.href = "/login";
          return;
        }

        const currentUser = data.user;

        setUser(currentUser);

        setUserEmail(currentUser.email || "");

        setUserName(
          currentUser.user_metadata?.full_name ||
          currentUser.user_metadata?.name ||
          "TECH GOD User"
        );

        setProfileImage(
          currentUser.user_metadata?.avatar_url ||
          currentUser.user_metadata?.picture ||
          "/default-profile.png"
        );

        const res = await fetch("/api/get-user-products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUser.email,
          }),
        });

        const result = await res.json();

        setProducts(result?.products || []);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    initializeDashboard();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  async function uploadProfile(event: any) {

    const file = event.target.files?.[0];

    if (!file || !userEmail) return;

    const fileExt = file.name.split(".").pop();

    const fileName = `${Date.now()}.${fileExt}`;

    const filePath = `${userEmail}/${fileName}`;

    const { error } = await supabase.storage
      .from("profiles")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      alert("Upload failed");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("profiles")
      .getPublicUrl(filePath);

    setProfileImage(publicUrl);

    alert("Profile updated");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading dashboard...
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-6xl">

        {/* PROFILE HEADER */}

        <div className="rounded-4xl border border-white/10 bg-gradient-to-br from-green-500/10 to-black p-6">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-6">

              {/* PROFILE */}

              <div className="relative">

                <button
                  onClick={() => setPreviewOpen(true)}
                  className="group relative"
                >

                  <img
                    src={profileImage || "/default-profile.png"}
                    alt="profile"
                    className="h-20 w-20 rounded-full border-4 border-green-500/30 object-cover"
                  />

                </button>

                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 right-0 rounded-full bg-green-500 p-2 text-black cursor-pointer z-20"
                >
                  <Camera size={16} />
                </label>

                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  onChange={uploadProfile}
                  className="hidden"
                />

              </div>

              {/* USER INFO */}

              <div>

                <h1 className="text-3xl font-bold">
                  {userName}
                </h1>

                <div className="mt-2 flex items-center gap-2 text-gray-400">

                  <Mail size={16} />

                  {userEmail}

                </div>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-300">

                  <ShieldCheck size={14} />

                  Verified Premium Member

                </div>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => {
                  setDarkMode(!darkMode);

                  if (!darkMode) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                }}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >

                <Moon size={16} />

                {darkMode ? "Dark Mode" : "Light Mode"}

              </button>

              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >

                <Settings size={16} />

                Settings

              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-2xl bg-red-500/20 px-4 py-3 text-sm text-red-300"
              >

                <LogOut size={16} />

                Logout

              </button>

            </div>

          </div>

        </div>

        {/* HERO */}

        <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-green-500/10 via-black to-emerald-500/5 p-8">

          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">

              <Sparkles size={16} />

              TECH GOD Premium Access

            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Welcome Back 👋
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400 leading-7">

              Access your premium products and creator systems securely.

            </p>

          </div>

        </div>

        {/* SOCIALS */}

        <div className="grid gap-5 md:grid-cols-4 mt-6">

          <a
            href="https://www.tiktok.com/@techgod30"
            target="_blank"
            className="rounded-2xl bg-green-500/20 px-6 py-3 font-bold text-center"
          >
            TikTok
          </a>

          <a
            href="https://youtube.com/@techgod30"
            target="_blank"
            className="rounded-2xl bg-red-500/20 px-6 py-3 font-bold text-center"
          >
            YouTube
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            className="rounded-2xl bg-pink-500/20 px-6 py-3 font-bold text-center"
          >
            Instagram
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            className="rounded-2xl bg-blue-500/20 px-6 py-3 font-bold text-center"
          >
            Facebook
          </a>

        </div>

        {/* STATS */}

        <div className="mt-6 grid gap-5 md:grid-cols-4">

          <Link href="/products">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-green-500/40 hover:bg-green-500/5 hover:scale-[1.02] cursor-pointer">

              <ShoppingBag />

              <h2 className="mt-4 text-3xl font-bold">
                {products?.length || 0}
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
                {products?.length || 0}
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

        {/* PRODUCTS */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            Your Product Library
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {products?.map((item, index) => (

              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-black p-6 hover:border-green-500/30 transition"
              >

                <div className="inline-flex rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">
                  Premium Product
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {item.product}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  Securely unlocked premium resource.
                </p>

                <a
                  href={`/access/${encodeURIComponent(item.product)}?token=${item.access_token}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 font-bold text-black"
                >

                  Open Product

                  <ExternalLink size={16} />

                </a>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* PREVIEW */}

      {previewOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-5">

          <div className="relative">

            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute -right-3 -top-3 rounded-full bg-white px-3 py-1 font-bold text-black"
            >
              ✕
            </button>

            <img
              src={profileImage || "/default-profile.png"}
              alt="preview"
              className="max-h-[85vh] rounded-4xl border border-white/10"
            />

          </div>

        </div>

      )}

    </main>
  );
}