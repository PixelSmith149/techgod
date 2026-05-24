import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Sparkles } from "lucide-react";
import PayButton from "@/components/PayButton";


const products = [
  {
    id: "creator-system",
    name: "Digital Product Creator System",
    title: "🔥 Digital Product Creator System",
    description:
      "A complete creator business system that teaches beginners how to build, launch, market, and scale profitable digital products online like a real brand.",
    price: 13.0,
    link: "/creator-system",
    badge: "BEST SELLER",
  },

  {
    id: "maplaunch-ai",
    name: "MapLaunch AI",
    title: "🎬 MapLaunch AI",
    description:
      "An AI-powered business visibility system helping entrepreneurs optimize their online presence and attract customers directly from Google search.",
    price: 8.0,
    link: "/maplaunch-ai",
    badge: "NEW",
  },

  {
    id: "dark-web-access-guide",
    name: "Dark Web Access Guide",
    title: "🚀 Dark Web Access Guide",
    description:
      "A beginner-friendly educational guide explaining how the dark web works, privacy basics, secure browsing, and safe learning resources.",
    price: 4.0,
    link: "/dark-web-access-guide",
    badge: "LIMITED",
  },
];

export default function Products() {
  return (
    <main className="min-h-screen bg-black text-white px-5 py-6">
      
      <Link
         href="/login"
         className="
           relative overflow-hidden
           rounded-2xl
           bg-green-500
           px-6 py-3
           font-bold
           text-black
           shadow-lg shadow-green-500/30
           transition
           hover:scale-105
           animate-pulse
           centre-left
        "
        >

         <span className="relative z-10">
           Sign In 
         </span>

           <div
           className="
           absolute inset-0
           bg-gradient-to-r
           from-transparent
           via-white/40
           to-transparent
           -translate-x-full
            animate-[shine_2s_linear_infinite]
        "   
        />

      </Link>

      <div className="mx-auto max-w-md">

        {/* TOP BAR */}

        <div className="flex items-center justify-between mb-10">

         <Link
           href="/dashboard"
           className="
           flex items-center gap-2
           rounded-2xl
           border border-white/10
           bg-white/5
           px-5 py-3
           text-sm font-medium
           text-white
           transition
           hover:border-green-500/40
           hover:bg-green-500/10
           hover:text-green-300
      "
     >

          ← Return Dashboard

     </Link>

          <h1 className="text-lg md:text-xl font-bold text-center">
            Premium Store
          </h1>

          <div className="w-12" />

        </div>

        {/* HERO */}

        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/10
            bg-gradient-to-br from-gray-900 to-black
            p-6
            shadow-2xl
          "
        >

          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles size={120} />
          </div>

          <div className="relative z-10">

            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <ShieldCheck size={16} />
              Secure Creator Commerce
            </div>

            <h2 className="mt-4 text-3xl font-bold leading-tight">
              My Premium Digital Products
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed text-sm">
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

        <div className="mt-8 space-y-6">

          {products.map((product, index) => (

            <div
              key={index}
              className="
                group
                relative overflow-hidden
                rounded-3xl
                border border-gray-800
                bg-gradient-to-br from-gray-900 to-black
                p-5
                shadow-xl
                transition-all duration-300
                hover:border-green-500/50
                hover:scale-[1.01]
              "
            >

              {/* GLOW EFFECT */}

              <div
                className="
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition duration-500
                  bg-gradient-to-r
                  from-green-500/5 to-transparent
                "
              />

              {/* BADGE */}

              <div
                className="
                  inline-flex items-center
                  rounded-full
                  border border-green-500/20
                  bg-green-500/10
                  px-3 py-1
                  text-xs font-semibold
                  text-green-400
                "
              >
                {product.badge}
              </div>

              {/* TITLE */}

              <h3 className="mt-4 text-xl font-bold leading-snug">
                {product.title}
              </h3>

              {/* DESCRIPTION */}

              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {product.description}
              </p>

              {/* PRICE */}

              <div className="mt-5 flex items-center justify-between">

                <div>

                  <p className="text-xs text-gray-500">
                    One-Time Payment
                  </p>

                  <h4 className="text-2xl font-bold text-green-400">
                    ${product.price.toFixed(2)}
                  </h4>

                </div>

              </div>

              {/* BUTTON */}

              <div className="mt-5">

                <PayButton product={product} />

              </div>

            </div>

          ))}

        </div>

        {/* FOOTER */}

        <div className="mt-10 pb-8 text-center">

          <p className="text-xs text-gray-600 leading-6">
            © 2026 Tech God Creator Commerce Platform <br />
            Secure digital access • Instant delivery • Premium resources
          </p>

        </div>

      </div>

    </main>
  );
}