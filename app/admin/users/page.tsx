"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data || []);
  }

  return (
    <main className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      {users.map((u) => (
        <div key={u.id} className="p-4 bg-white/5 rounded-xl mb-3">
          <p>{u.email}</p>
          <p className="text-gray-400 text-sm">{u.country}</p>
        </div>
      ))}
    </main>
  );
}