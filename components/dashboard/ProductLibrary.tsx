import {
  ExternalLink,
  ShoppingBag,
} from "lucide-react";

export default function ProductLibrary({
  products,
}: any) {

  return (

    <div className="mt-10">

      <h2 className="text-2xl font-bold">
        Your Product Library
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        {products.map(
          (item: any, index: number) => (

            <div
              key={index}
              className="
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <ShoppingBag />

              <h3 className="mt-4 text-xl font-bold">
                {item.product}
              </h3>

              <a
                href={`/access/${encodeURIComponent(item.product)}?token=${item.access_token}`}
                className="
                  mt-6 inline-flex items-center gap-2
                  rounded-2xl
                  bg-green-500
                  px-5 py-3
                  font-bold
                  text-black
                "
              >

                Open Product

                <ExternalLink size={16} />

              </a>

            </div>

          )
        )}

      </div>

    </div>

  );

}