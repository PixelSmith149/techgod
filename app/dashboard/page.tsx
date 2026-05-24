"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ShoppingBag,
  Download,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Mail,
  Clock3,
  Settings,
  Moon,
  Camera,
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

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUser(user);

      const email = user.email || "";

      const name =
        user.user_metadata?.full_name || "";

      const avatar =
        user.user_metadata?.avatar_url || "";

      setUserEmail(email);

      setUserName(name);

      setProfileImage(avatar);

      localStorage.setItem(
        "user_email",
        email
      );

      localStorage.setItem(
        "user_name",
        name
      );

      localStorage.setItem(
        "user_profile",
        avatar
      );

      const res = await fetch(
        "/api/get-user-products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await res.json();

      setProducts(data.products || []);

    } catch (error) {

      console.log(error);

    }

  }

  async function uploadProfile(event: any) {

    const file =
      event.target.files?.[0];

    if (!file) return;

    const email =
      localStorage.getItem(
        "user_email"
      );

    if (!email) return;

    const fileExt =
      file.name.split(".").pop();

    const fileName =
      `${Date.now()}.${fileExt}`;

    const filePath =
      `${email}/${fileName}`;

    const { error } =
      await supabase.storage
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

    localStorage.setItem(
      "user_profile",
      publicUrl
    );

    alert(
      "Profile updated successfully"
    );

  }

  async function logout() {

    localStorage.clear();

    await supabase.auth.signOut();

    window.location.href = "/";

  }

  return (

    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-6xl">

        {/* TOP PROFILE */}

        <div
          className="
            rounded-4xl
            border border-white/10
            bg-gradient-to-br
            from-green-500/10
            to-black
            p-6
          "
        >

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-6">

              {/* PROFILE IMAGE */}

              <div className="relative">

                <button
                  onClick={() =>
                    setPreviewOpen(true)
                  }
                  className="group relative"
                >

                  <img
                    src={
                      profileImage ||
                      "/default-profile.png"
                    }
                    alt="profile"
                    className="
                      h-20
                      w-20
                      rounded-full
                      border-2
                      border-green-500/30
                      object-cover
                      transition
                      group-hover:scale-105
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      flex items-center justify-center
                      rounded-full
                      bg-black/50
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "
                  >

                    <span className="text-xs font-bold text-white">
                      View
                    </span>

                  </div>

                </button>

                <label
                  htmlFor="profileUpload"
                  className="
                    absolute bottom-0 right-0
                    rounded-full
                    bg-green-500
                    p-2
                    text-black
                    cursor-pointer
                  "
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
                  {userName || "User"}
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

            {/* SETTINGS */}

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                className="
                  flex items-center gap-2
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-4 py-3
                  text-sm
                "
              >

                <Moon size={16} />

                {darkMode
                  ? "Dark Mode"
                  : "Light Mode"}

              </button>

              <Link
                href="/settings"
                className="
                  flex items-center gap-2
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-4 py-3
                  text-sm
                  hover:border-green-500/30
                  transition
                "
              >

                <Settings size={16} />

                Settings

              </Link>

              <button
                onClick={logout}
                className="
                  flex items-center gap-2
                  rounded-2xl
                  bg-red-500/20
                  px-4 py-3
                  text-sm text-red-300
                "
              >

                Logout

              </button>

            </div>

          </div>

        </div>

        {/* HERO */}

        <div
          className="
            relative mt-8 overflow-hidden
            rounded-[32px]
            border border-white/10
            bg-gradient-to-br
            from-green-500/10
            via-black
            to-emerald-500/5
            p-8
          "
        >

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

              Access your premium digital products,
              creator systems, downloads,
              business resources, and
              exclusive content securely.

            </p>

          </div>

        </div>

        {/* PRODUCT LIBRARY */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            Your Product Library
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {products.map((item, index) => (

              <div
                key={index}
                className="
                  rounded-3xl
                  border border-white/10
                  bg-gradient-to-br
                  from-white/[0.05]
                  to-black
                  p-6
                  hover:border-green-500/30
                  transition
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <div className="inline-flex rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">
                      Premium Product
                    </div>

                    <h3 className="mt-4 text-xl font-bold">
                      {item.product}
                    </h3>

                  </div>

                  <div className="rounded-2xl bg-green-500/10 p-3 text-green-400">

                    <ShoppingBag size={20} />

                  </div>

                </div>

                <p className="mt-4 text-sm leading-7 text-gray-400">

                  Securely unlocked premium
                  digital resource available
                  inside your creator account.

                </p>

                <div className="mt-6">

                  <a
                    href={`/access/${encodeURIComponent(item.product)}?token=${item.access_token}`}
                    className="
                      flex items-center gap-2
                      rounded-2xl
                      bg-green-500
                      px-5 py-3
                      font-bold
                      text-black
                      hover:scale-[1.02]
                      transition
                    "
                  >

                    Open Product

                    <ExternalLink size={16} />

                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* IMAGE PREVIEW */}

      {previewOpen && (

        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/90
            backdrop-blur-lg
            p-5
          "
        >

          <div className="relative">

            <button
              onClick={() =>
                setPreviewOpen(false)
              }
              className="
                absolute -right-3 -top-3
                rounded-full
                bg-white
                px-3 py-1
                font-bold
                text-black
              "
            >

              ✕

            </button>

            <img
              src={
                profileImage ||
                "/default-profile.png"
              }
              alt="preview"
              className="
                max-h-[85vh]
                rounded-4xl
                border border-white/10
              "
            />

          </div>

        </div>

      )}

    </main>

  );

}

function setUpLoading(
  isLoading: boolean
) {

  if (
    typeof window === "undefined"
  ) return;

  const body = document.body;

  if (isLoading) {

    body.style.cursor = "wait";

    body.classList.add(
      "app-loading"
    );

  } else {

    body.style.cursor = "";

    body.classList.remove(
      "app-loading"
    );

  }

}