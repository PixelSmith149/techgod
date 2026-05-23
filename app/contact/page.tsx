import Link from "next/link";
import { Phone, Mail, MessageCircle, ArrowLeft } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <ArrowLeft size={18} />
          Home
        </Link>

        <h1 className="text-lg font-bold">Contact Me</h1>

        <div />
      </div>

      {/* Contact Card */}
      <div className="space-y-4">

        {/* WhatsApp */}
        <a
          href="https://wa.me/233249316033"
          target="_blank"
          className="flex items-center gap-3 p-4 bg-green-600 rounded-xl hover:scale-105 transition"
        >
          <MessageCircle />
          WhatsApp Chat
        </a>

        {/* Call */}
        <a
          href="tel:+233249316033"
          className="flex items-center gap-3 p-4 bg-blue-600 rounded-xl hover:scale-105 transition"
        >
          <Phone />
          Direct Call
        </a>

        {/* Email */}
        <a
          href="mailto:techgod3578@gmail.com"
          className="flex items-center gap-3 p-4 bg-red-600 rounded-xl hover:scale-105 transition"
        >
          <Mail />
          Send Email
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/techgod3"
          target="_blank"
          className="flex items-center gap-3 p-4 bg-purple-600 rounded-xl hover:scale-105 transition"
        >
          <MessageCircle />
          Telegram Chat
        </a>

      </div>
    </main>
  );
}