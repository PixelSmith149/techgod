import { Divide } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {

  return (

    <div

    className="mt-6 flex flex-col gap-5">
        {/* VIEW STORE */} 
     <Link 
       href="/products"
       className=" 
       rounded-2xl 
       border border-white/10
       bg-green-500 
       px-6 py-3 
       font-bold 
       text-black 
       hover:scale-[1.02] 
       transition " 
      > 
       View Store 
     </Link> 

         {/* SOCIAL BUTTONS */} 
       <div 
         className="
         grid gap-5 
         md:grid-cols-4"
       > 
     
         {/* TikTok */} 
       <a 
         href="https://www.tiktok.com/@techgod30?_r=1&_t=ZN-96YsO9vLWv0" 
         target="_blank" 
         rel="noopener noreferrer" 
         className=" 
         rounded-2xl 
         border border-white/10
         bg-green-500/20 
         px-6 py-3 
         font-bold 
         hover:bg-white/10 
         hover:scale-[1.02] 
         transition " 
        > 
         Back to TikTok 
       </a> 

         {/* YouTube */} 
       <a 
          href="https://youtube.com/@techgod30?si=wUlhkTL6Q280T4vf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className=" 
          rounded-2xl 
          border border-white/10
          bg-red-500/20 
          px-6 py-3 
          font-bold 
          hover:bg-white/10 
          hover:scale-[1.02] 
          transition " 
        > 
          Back to YouTube 
       </a> 

           {/* Instagram */} 
       <a 
          href="https://www.instagram.com/techgod.30?igsh=ZWg1Z2dzcjVuNmFk&utm_source=qr" 
          target="_blank" 
          rel="noopener noreferrer" 
          className=" 
          rounded-2xl 
          border border-white/10
          bg-pink-500/20 
          px-6 py-3 
          font-bold 
          hover:bg-white/10 
          hover:scale-[1.02] 
          transition " 
        > 
          Back to Instagram 
        </a>

          {/* Facebook */} 
        <a 
          href="https://www.facebook.com/share/1DzMXT7Sz5/?mibextid=wwXIfr" 
          target="_blank" 
          rel="noopener noreferrer" 
          className=" 
          rounded-2xl 
          border border-white/10
          bg-blue-500/20 
          px-6 py-3 
          font-bold 
          hover:bg-white/10 
          hover:scale-[1.02] 
          transition " 
        > 
          Back to Facebook 
        </a> 

         </div>

    </div>

    );

}