"use client";

import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaTelegramPlane,
} from "react-icons/fa";
import { useEffect } from "react";
import { Mail } from "lucide-react"; // FIX: replaced missing Contact with Mail

const socialLinks = [
  {
    name: "YouTube",
    url: "https://youtube.com/@techgod30?si=wUlhkTL6Q280T4vf",
    icon: <FaYoutube size={22} />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1DzMXT7Sz5/?mibextid=wwXIfr",
    icon: <FaFacebook size={22} />,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@techgod30?_r=1&_t=ZN-96YsO9vLWv0",
    icon: <FaTiktok size={22} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/techgod.30?igsh=ZWg1Z2dzcjVuNmFk&utm_source=qr",
    icon: <FaInstagram size={22} />,
  },
  {
    name: "Telegram",
    url: "https://t.me/therevolutionariess",
    icon: <FaTelegramPlane size={22} />,
  },
];

export default function HomePage() {
  const router = useRouter();

useEffect(() => {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
}, []);

function handleProductsAccess() {
  router.push("/products");
}

  return (
    <main className="text-white">

      <main className="min-h-screen bg-black text-white overflow-hidden relative">

        {/* Background Glow Effects */}
        <div className="absolute top-0 left-0 h-72 w-72 bg-green-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 mx-auto max-w-md px-5 py-8">

          {/* TOP BAR */}
          <div className="flex justify-end">

            <a
              href="/contact"
              className="
                group
                rounded-2xl
                border border-white/10
                bg-green-500/50
                p-3
                backdrop-blur-xl
                transition-all
                duration-300
                hover:bg-green-500/10
                hover:border-green-500/30
              "
            >
              <Mail size={18} />
            </a>

          </div>

          {/* PROFILE SECTION */}
          <div className="mt-6 flex flex-col items-center">

            <div className="relative w-full max-w-3xl">

              <div className="absolute inset-0 rounded-2xl bg-green-500/20 blur-2xl" />

              <Image
                src="/profile.webp"
                alt="profile"
                width={1200}
                height={600}
                priority
                className="relative w-full h-64 md:h-80 rounded-2xl object-cover border-4 border-white/10 shadow-2xl"
              />

            </div>

          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-center">
            TECH GOD's HUB
          </h1>

          <div className="mt-2 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-green-400 to-emerald-600" />

          <p className="mt-6 text-center text-gray-400 leading-7 text-[15px]">
            Tech Creator • Web Developer • Data Analysis Expert CRM & Growth Manager
          </p>

          {/* SOCIAL LINKS */}
          <div className="mt-12 flex flex-col gap-4">

            {socialLinks.map((link, index) => (

              <a
                key={index}
                href={link.url}
                target="_blank"
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 border border-white/10">
                    {link.icon}
                  </div>

                  <span className="font-semibold text-lg">
                    TechGod's Hub On {link.name}
                  </span>

                </div>

              </a>

            ))}

          </div>

          {/* DIGITAL PRODUCTS */}
          <div className="mt-14">

            <button
              onClick={handleProductsAccess}
              className="
                w-full
                rounded-3xl
                bg-gradient-to-r
                from-green-500
                to-emerald-600
                p-5
                text-lg
                font-bold
                text-black
              "
            >
              ⚙️Premium Tools And Software HUB⚡
            </button>

          </div>


        </div>

      </main>

   

{/* HERO IMAGE (1st IMAGE SECTION) */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-white/10">

          <Image
            src="/creator-system-hero.png"
            alt="Creator System"
            width={1200}
            height={700}
            className="w-full object-cover"
          />

        </div>

 {/* FOOTER */}
          <div className="mt-14 pb-8 text-center">

            <p className="text-xs tracking-wide text-gray-600">
              © TECH GOD • All Rights Reserved
            </p>

          </div>

         </main>
  );
}