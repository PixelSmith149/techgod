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
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, Sparkles } from "lucide-react";


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

         {/* TOP NAV */}
        <div className="flex items-center justify-between mb-10">

          <a
             href="/contact"
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
          
            <ArrowRight size={18} />
            Contact Support
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


        </div>

      </main>

   

   <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black px-6 py-16 md:px-12">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.25),transparent_55%)]" />
  <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
  <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

  <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">

    {/* LEFT CONTENT */}
    <div>

      <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
        ⚽ Trusted Betting Partner
      </div>

      <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-6xl">
        Predict.
        <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          {" "}Win.
        </span>
        <br />
        Cash Out Big.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
        Join thousands of football fans betting live matches, odds boosts,
        and instant cashouts on 1win.
        Register now through my exclusive partner access and start winning smarter.
      </p>

      {/* FEATURES */}
      <div className="mt-8 flex flex-wrap gap-3">

        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
          ⚡ Instant Registration
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
          💸 Fast Withdrawals
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
          ⚽ Live Football Odds
        </div>

      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-wrap items-center gap-4">

        <a
          href="https://1win.com/betting?p=kjep&sharebet=techgod"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.45)]"
        >
          Register & Start Winning
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        <div className="text-sm text-gray-500">
          Partner access powered by 1win
        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="relative">

      <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-green-500/20 to-emerald-500/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl">

        <img
          src="/football-hero.png"
          alt="Football Betting Hero"
          className="h-full w-full object-cover"
        />

        {/* FLOATING CARD */}
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-green-500/20 bg-black/70 p-5 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-400">
                Live Match Odds
              </p>

              <h3 className="mt-1 text-2xl font-bold text-white">
                Arsenal vs Madrid
              </h3>
            </div>

            <div className="rounded-xl bg-green-500 px-4 py-2 text-lg font-black text-black">
              3.45x
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

 {/* FOOTER */}
          <div className="mt-14 pb-8 text-center">

            <p className="text-xs tracking-wide text-gray-600">
              © TECH GOD • All Rights Reserved
            </p>

          </div>

         </main>
  );
}