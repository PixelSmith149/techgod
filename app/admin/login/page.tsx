"use client";

import { useState } from "react";

import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleLogin() {

    const adminEmail =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const adminPassword =
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (
      email === adminEmail &&
      password === adminPassword
    ) {

      localStorage.setItem(
        "admin_access",
        "true"
      );

      router.push("/admin");

    } else {

      alert("Invalid admin credentials");

    }
  }

  return (

    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-md">

        {/* LOGO */}

        <div className="text-center">

          <div
            className="
              mx-auto flex h-20 w-20
              items-center justify-center
              rounded-3xl
              bg-green-500/10
              text-green-400
            "
          >
            <ShieldCheck size={40} />
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Admin Access
          </h1>

          <p className="mt-3 text-gray-400 leading-7">
            Secure admin portal for TECH GOD commerce platform.
          </p>

        </div>

        {/* FORM */}

        <div
          className="
            mt-10 rounded-3xl
            border border-white/10
            bg-white/[0.03]
            p-6
          "
        >

          {/* EMAIL */}

          <div className="relative">

            <Mail
              size={18}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full rounded-2xl
                border border-white/10
                bg-black/40
                py-3 pl-12 pr-4
                text-white
                outline-none
                focus:border-green-500
              "
            />

          </div>

          {/* PASSWORD */}

          <div className="relative mt-4">

            <Lock
              size={18}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full rounded-2xl
                border border-white/10
                bg-black/40
                py-3 pl-12 pr-4
                text-white
                outline-none
                focus:border-green-500
              "
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={handleLogin}
            className="
              mt-6 flex w-full
              items-center justify-center gap-2
              rounded-2xl
              bg-gradient-to-r
              from-green-500
              to-emerald-600
              px-5 py-4
              font-bold
              text-black
              transition
              hover:scale-[1.02]
            "
          >

            Login To Admin

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </main>
  );
}