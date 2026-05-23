"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Moon,
  Sun,
  User,
  Mail,
  Save,
} from "lucide-react";

export default function SettingsPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    const savedName =
      localStorage.getItem("user_name");

    const savedEmail =
      localStorage.getItem("user_email");

    const theme =
      localStorage.getItem("theme");

    if (savedName) setName(savedName);

    if (savedEmail) setEmail(savedEmail);

    if (theme === "light") {
      setDarkMode(false);
    }

  }, []);

  function saveSettings() {

    localStorage.setItem(
      "user_name",
      name
    );

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

    alert("Settings updated");
  }

  return (

    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-2xl">

        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >

          <ArrowLeft size={18} />

          Dashboard

        </Link>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <h1 className="text-3xl font-bold">
            Account Settings
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your creator profile and preferences.
          </p>

          <div className="mt-8 space-y-5">

            {/* NAME */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">

                <User size={16} />

                Full Name

              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-black/40
                  px-4 py-3
                  outline-none
                  focus:border-green-500
                "
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm text-gray-400">

                <Mail size={16} />

                Email Address

              </label>

              <input
                type="email"
                value={email}
                disabled
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-black/40
                  px-4 py-3
                  opacity-60
                "
              />

            </div>

            {/* THEME */}

            <div>

              <label className="mb-3 block text-sm text-gray-400">
                Appearance
              </label>

              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                className="
                  flex items-center gap-2
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-5 py-3
                "
              >

                {darkMode ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )}

                {darkMode
                  ? "Dark Mode"
                  : "Light Mode"}

              </button>

            </div>

            {/* SAVE */}

            <button
              onClick={saveSettings}
              className="
                flex items-center gap-2
                rounded-2xl
                bg-green-500
                px-6 py-4
                font-bold
                text-black
              "
            >

              <Save size={18} />

              Save Settings

            </button>

          </div>

        </div>

      </div>

    </main>
  );
}