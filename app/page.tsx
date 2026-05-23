import NextLink from "next/link";

import {
  Send,
  Contact,
} from "lucide-react";

import {
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

import Image from "next/image";

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
    name: "Telegram Channel",
    url: "https://t.me/therevolutionariess",
    icon: <FaTelegramPlane size={22} />,
  },
];

export default function Home() {
  return (
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
              name:Contact TechGod
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
              hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]
            "
          >
            <Contact
              size={25}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>

        </div>

        {/* PROFILE SECTION */}
        <div className="mt-6 flex flex-col items-center">

         <div className="relative w-full max-w-3xl">

       {/* glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-green-500/20 blur-2xl" />
           <Image
  src="/profile.webp"
  alt="profile"
  width={1200}
  height={600}
  priority
  sizes="(max-width: 768px) 100vw, 1200px"
  className="
    relative
    w-full
    h-64
    md:h-80
    rounded-2xl
    object-cover
    border-4
    border-white/10
    shadow-2xl
  "
/>

          </div>

         </div>

        </div>

             <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-center">
               TECH GOD's HUB
             </h1>

             <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-600" />

              <p className="mt-6 text-center text-gray-400 leading-7 text-[15px]">
                Tech Creator • Web Developer • Data Analysis Expert 
                            CRM & Growth Manager 
                Sharing tech knowledge, premium digital products,
                softwares, tutorials, gadget reviews & advanced phone hacks.
                Available for collaborations & business partnerships.
              </p>


        {/* SOCIAL LINKS */}
        <div className="mt-12 flex flex-col gap-4">

          {socialLinks.map((link, index) => (

            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/5
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-white/10
                hover:border-green-500/30
                hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]
              "
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-green-500/5 to-transparent" />

              <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-black/40
                    border border-white/10
                  ">
                    {link.icon}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Visit
                    </p>

                    <span className="font-semibold text-lg">
                      My {link.name}
                    </span>
                  </div>

                </div>

                <div className="
                  text-2xl
                  text-gray-500
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                ">
                  →
                </div>

              </div>

            </a>

          ))}

        </div>

        {/* DIGITAL PRODUCTS */}
        <div className="mt-14">

          <NextLink
            href="/products"
            className="
              group
              relative
              flex
              items-center
              justify-center
              gap-3
              overflow-hidden
              rounded-3xl
              bg-gradient-to-r
              from-green-500
              to-emerald-600
              p-5
              text-lg
              font-bold
              text-black
              shadow-2xl
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]
            "
          >

            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />

            <span className="relative text-2xl">
              🛍
            </span>

            <span className="relative">
              My Premium Digital Products HUB
            </span>

          </NextLink>

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