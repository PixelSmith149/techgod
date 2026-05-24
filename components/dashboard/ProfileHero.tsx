"use client";

import Link from "next/link";

import {
  ShieldCheck,
  Mail,
  Settings,
  Moon,
  Camera,
} from "lucide-react";

interface Props {
  profileImage: string;
  userName: string;
  userEmail: string;
  darkMode: boolean;
  setDarkMode: any;
  logout: () => void;
  openPreview: () => void;
}

export default function ProfileHero({
  profileImage,
  userName,
  userEmail,
  darkMode,
  setDarkMode,
  logout,
  openPreview,
}: Props) {

  return (

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

          <button
            onClick={openPreview}
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
              "
            />

          </button>

          <div>

            <h1 className="text-3xl font-bold">
              {userName || "user"}
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
            className="
              rounded-2xl
              border border-white/10
              bg-white/5
              px-4 py-3
            "
          >

            <Moon size={16} />

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
              rounded-2xl
              bg-red-500/20
              px-4 py-3
              text-red-300
            "
          >

            Logout

          </button>

        </div>

      </div>

    </div>

  );

}