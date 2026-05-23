"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {

    const adminEmail =
      localStorage.getItem("user_email");

    const allowedAdmin =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (
      adminEmail &&
      adminEmail === allowedAdmin
    ) {

      setAllowed(true);

    } else {

      router.push("/dashboard");

    }

  }, []);

  if (!allowed) {

    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          bg-black text-white
        "
      >
        Checking Admin Access...
      </div>
    );
  }

  return <>{children}</>;
}