
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Sparkles } from "lucide-react";

const products = [
  {
    id: "creator-system",
    name: "Digital Product Creator System",
    description:
      "A complete creator business system that teaches beginners how to build, launch, market, and scale profitable digital products online like a real brand.",
    badge: "BEST SELLER",
  },

  {
    id: "maplaunch-ai",
    name: "MapLaunch AI",
    description:
      "An AI-powered business visibility system helping entrepreneurs optimize their online presence and attract customers directly from Google search.",
    badge: "NEW",
  },

  {
    id: "dark-web-guide",
    name: "Dark Web Access Guide",
    description:
      "A beginner-friendly educational guide explaining how the dark web works, privacy basics, secure browsing, and safe learning resources.",
    badge: "LIMITED",
  },
];

export default function productsPage() {
  return (


    <main className="min-h-screen bg-black text-white px-5 py-6">

      {/* TOP NAV */}
        <div className="flex items-center justify-between mb-10">

          <Link
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
          
            <ArrowLeft size={18} />
            Contact Support
          </Link>
       

         

          <div className="
                w-full
                rounded-3xl
                bg-gradient-to-r
                from-black-300
                to-emerald-600
                p-5
                text-lg
                font-bold
                text-black
              "
            >
            <Lock size={25} />
             <h1> PREMIUM   SYSTEM </h1>
          </div>

          </div>

      {/* HERO */}

      <div
        className="
          relative overflow-hidden
          rounded-3xl
          border border-white/10
          bg-gradient-to-br from-gray-900 via-black to-black
          p-6
          shadow-2xl
        "
      >

        <div className="absolute top-0 right-0 opacity-10 blur-2xl">
          <Sparkles size={140} />
        </div>

        <div className="relative z-10">

          <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
            <ShieldCheck size={16} />
            Secure Creator Commerce
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
            Premium Digital Products And Softwares⚡⚡
          </h2>

          <p className="mt-4 text-gray-400 leading-relaxed text-sm md:text-base max-w-2xl">
            Access premium creator systems, growth tools,
            business resources, digital guides, and exclusive
            educational products built for creators and entrepreneurs.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <Lock size={14} />
            Secure payments powered by Paystack
          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="mt-8 flex flex-col gap-6">

        {products.map((item) => (

          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className="block"
          >

            <div
              className="
                relative overflow-hidden
                group
                rounded-[30px]
                border border-white/10
                bg-gradient-to-br
                from-white/[0.06]
                to-white/[0.02]
                p-6 md:p-7
                transition-all duration-300
                hover:border-green-500/40
                hover:scale-[1.01]
                hover:shadow-[0_0_40px_rgba(34,197,94,0.12)]
                backdrop-blur-sm
                cursor-pointer
              "
            >

              {/* GLOW */}
              <div
                className="
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition duration-500
                  bg-gradient-to-r
                  from-green-500/5
                  via-transparent
                  to-transparent
                  pointer-events-none
                "
              />

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="flex-1">

                  <div className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400 mb-4">
                    {item.badge}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {item.name}
                  </h2>

                  <p className="mt-4 text-gray-400 leading-7 max-w-2xl">
                    {item.description}
                  </p>

                </div>

                {/* ACTION */}
                <div
                  className="
                    flex items-center justify-center
                    rounded-2xl
                    border border-green-500/20
                    bg-green-500/10
                    px-5 py-4
                    text-green-400
                    font-bold
                    min-w-[180px]
                    group-hover:bg-green-500
                    group-hover:text-black
                    transition-all duration-300
                  "
                >
                  <div className="flex items-center gap-2 group-hover:translate-x-1 transition">
                    View Product Details →
                  </div>
                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

      {/* FOOTER */}
      <div className="mt-10 pb-8 text-center">

        <p className="text-xs text-gray-600 leading-6">
          © 2026 Tech God Creator Commerce Platform <br />
          Secure digital access • Instant delivery • Premium resources
        </p>

      </div>

    </main>
  );
}