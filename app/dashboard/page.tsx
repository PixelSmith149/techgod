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
  User,
  Settings,
  Moon,
  Camera,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

interface ProductItem {
  product: string;
  access_token: string;
}

export default function Dashboard() {
  const [previewOpen, setPreviewOpen] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [darkMode, setDarkMode] = useState(true);
useEffect(() => {
    loadDashboard();
  }, []);

    async function uploadProfile(event: any) {

      const file = event.target.files?.[0];

      if (!file) return;

      const email =
        localStorage.getItem("user_email");

      if (!email) return;

      const fileExt =
        file.name.split(".").pop();

      const fileName =
        `${Date.now()}.${fileExt}`;

      const filePath =
        `${email}/${fileName}`;

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

      localStorage.setItem(
        "user_profile",
        publicUrl
      );

      alert("Profile updated successfully");
    }

    async function loadDashboard() {
      try {
        const email = localStorage.getItem("user_email");

        if (!email) return;

        const name = localStorage.getItem("user_name") || "";
        const profile = localStorage.getItem("user_profile") || "";

        setUserEmail(email);
        setUserName(name);
        setProfileImage(profile);

        const res = await fetch("/api/get-user-products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        setProducts(data.products || []);
      } catch (error) {
        console.log(error);
      }
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
                  onClick={() => setPreviewOpen(true)}
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
                  border-4
                  border-white/10
                  border-2
                  border-green-500/30
                  object-cover
                  transition
                  group-hover:scale-105
                 "
                />

              {/* Overlay */}

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

                {darkMode ? "Dark Mode" : "Light Mode"}

              </button>

              <button
                className="
                  flex items-center gap-2
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-4 py-3
                  text-sm
                "
              >

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
              </button>

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

              Access your premium digital products, creator systems,
              downloads, business resources, and exclusive content securely.

            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="mt-6 flex flex-col gap-5">
     {/* VIEW STORE */}
  <Link
    href="/products"
    className="
      rounded-2xl
      bg-green-500
      px-6 py-3
      font-bold
      text-black
      hover:scale-[1.02]
      transition
    "
  >
    View Store
  </Link>

  {/* SOCIAL BUTTONS */}

<div className="grid gap-5 md:grid-cols-4">

  {/* TikTok */}
  <a
    href="https://www.tiktok.com/@techgod30?_r=1&_t=ZN-96YsO9vLWv0"
    target="_blank"
    rel="noopener noreferrer"
    className="
      rounded-2xl
      border border-white/10
      bg-green-500/20
      px-6 py-3
      font-bold
      hover:bg-white/10
      hover:scale-[1.02]
      transition
    "
  >
    Back to TikTok
  </a>

  {/* YouTube */}
  <a
    href="https://youtube.com/@techgod30?si=wUlhkTL6Q280T4vf"
    target="_blank"
    rel="noopener noreferrer"
    className="
      rounded-2xl
      border border-white/10
      bg-red-500/20
      px-6 py-3
      font-bold
      hover:bg-white/10
      hover:scale-[1.02]
      transition
    "
  >
    Back to YouTube
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/techgod.30?igsh=ZWg1Z2dzcjVuNmFk&utm_source=qr"
    target="_blank"
    rel="noopener noreferrer"
    className="
      rounded-2xl
      border border-white/10
      bg-pink-500/20
      px-6 py-3
      font-bold
      hover:bg-white/10
      hover:scale-[1.02]
      transition
    "
  >
    Back to Instagram
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/1DzMXT7Sz5/?mibextid=wwXIfr"
    target="_blank"
    rel="noopener noreferrer"
    className="
      rounded-2xl
      border border-white/10
      bg-blue-500/20
      px-6 py-3
      font-bold
      hover:bg-white/10
      hover:scale-[1.02]
      transition
    "
  >
    Back to Facebook
  </a>

</div>

        {/* user's assets */}
       <div className="mt-6 flex flex-col gap-5">

  {/* PRODUCTS OWNED */}

  <Link href="/products">

    <div
      className="
        h-full
        rounded-3xl
        border border-white/10
        bg-white/5
        p-5
        transition
        hover:border-green-500/40
        hover:bg-green-500/5
        hover:scale-[1.02]
        cursor-pointer
        hover:translate-x-1
      "
    >


      <ShoppingBag className="text-green-400" />

      <h2 className="mt-4 text-3xl font-bold">
        {products.length}
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Products Owned
      </p>

    </div>

  </Link>

  {/* DOWNLOADS */}

  <Link href="/premium-assets">

    <div
      className="
        h-full
        rounded-3xl
        border border-white/10
        bg-white/5
        p-5
        transition
        hover:border-green-500/40
        hover:bg-green-500/5
        hover:scale-[1.02]
        cursor-pointer
        hover:translate-x-1
      "
    >

      <Download className="text-green-400" />

      <h2 className="mt-4 text-3xl font-bold">
        {products.length}
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Downloads Ready
      </p>

    </div>

  </Link>

  {/* ACCESS STATUS */}

  <Link href="/dashboard/security">

    <div
      className="
        h-full
        rounded-3xl
        border border-white/10
        bg-white/5
        p-5
        transition
        hover:border-green-500/40
        hover:bg-green-500/5
        hover:scale-[1.02]
        cursor-pointer
        hover:translate-x-1
      "
    >

      <ShieldCheck className="text-green-400" />

      <h2 className="mt-4 text-3xl font-bold">
        Active
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Access Status
      </p>

    </div>

  </Link>

  {/* CLOUD ACCESS */}

  <Link href="/contact">

    <div
      className="
        h-full
        rounded-3xl
        border border-white/10
        bg-white/5
        p-5
        transition
        hover:border-green-500/40
        hover:bg-green-500/5
        hover:scale-[1.02]
        hover:translate-x-1
        cursor-pointer
      "
    >

      <Clock3 className="text-green-400" />

      <h2 className="mt-4 text-3xl font-bold">
        24/7
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Cloud Access
      </p>

    </div>

  </Link>

</div>
        {/* PRODUCT LIBRARY */}

        <div className="mt-10">

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <h2 className="text-2xl font-bold">
              Your Product Library
            </h2>

            <Link
              href="/products"
                className="
                    h-full
                    rounded-3xl
                    border border-white/10
                    bg-white/[0.03]
                    p-5
                    hover:border-green-500/40
                    hover:bg-green-500/5
                    transition
                    cursor-pointer
                    hover:translate-x-1
               "
            ></Link>

                 <div className="flex items-center justify-between gap-8">
                     
                    <div>
                        <p className="text-sm text-gray-400">
                            products
                        </p>

                         <h3 className="mt-1 text-2xl font-bold">
                          {products.length} Premium Assets
                         </h3>
                     </div>


                  <div
                    className="
                      rounded-2xl
                      bg-green-500/10
                      p-4
                      text-green-400
                    "
                  >
                    <ShoppingBag size={24} />
                  </div>

                </div>

              </div>


          </div>

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

               <div className="mt-6 flex flex-col gap-5">

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

                  Securely unlocked premium digital resource available
                  inside your creator account.

                </p>

                <div className="mt-6 flex flex-col gap-5">

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
                      hover:translate-x-1
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

      {/* PROFILE IMAGE PREVIEW */}

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
        onClick={() => setPreviewOpen(false)}
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

function setUpLoading(isLoading: boolean) {
  if (typeof window === "undefined") return;

  const body = document.body;

  if (isLoading) {
    body.style.cursor = "wait";
    body.classList.add("app-loading");
  } else {
    body.style.cursor = "";
    body.classList.remove("app-loading");
  }
}
