import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export default function CreatorSystem() {

  return (

    <main className="min-h-screen bg-black text-white px-5 py-8">

      <div className="mx-auto max-w-3xl">

        {/* TOP */}

        <div className="flex items-center justify-between mb-10">

          <Link
            href="/products"
            className="text-gray-400 hover:text-white transition"
          >
            <ArrowLeft />
          </Link>

          <div className="flex items-center gap-2 text-green-400 text-sm">

            <ShieldCheck size={16} />

            Protected Access

          </div>

        </div>

        {/* HERO */}

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-gradient-to-br
            from-gray-900
            to-black
            p-8
          "
        >

          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              bg-green-500/10
              px-4 py-2
              text-green-400
              text-sm
            "
          >

            <Lock size={15} />

            Premium Product

          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight">

            Digital Product Creator System

          </h1>

          <p className="mt-5 text-gray-400 leading-relaxed">

            Welcome to your premium creator system.

            This product teaches you how to:
            build, launch, market, and scale profitable
            digital products online.

          </p>

        </div>

        {/* CONTENT */}

        <div className="mt-8 grid gap-6">

          {/* RESOURCE */}

          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              p-6
            "
          >

            <h2 className="text-xl font-bold">
              Main Resource
            </h2>

            <p className="mt-3 text-gray-400 text-sm">

              Access the full creator system below.

            </p>

            <a
              href="https://www.notion.so/Digital-Product-Creator-System-1-352b97d71042800ab5c6f38c1511a5df?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-5 inline-flex
                rounded-2xl
                bg-green-500
                px-5 py-3
                font-bold
                text-black
                hover:scale-[1.02]
                transition
              "
            >

              Open Creator System

            </a>

          </div>

          {/* BONUS */}

          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              p-6
            "
          >

            <h2 className="text-xl font-bold">
              Bonus Strategy
            </h2>

            <p className="mt-3 text-gray-400 text-sm leading-7">

              Study the system repeatedly.

              Implement one section at a time.

              Focus on consistency instead of trying
              to master everything in one day.

            </p>

          </div>

        </div>

      </div>

    </main>

  );
}