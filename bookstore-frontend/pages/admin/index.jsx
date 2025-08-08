"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  const router = useRouter();

  // naive guard
  useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      if (!auth) router.replace("/login");
    } catch {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="max-w-[1400px] mx-auto py-6">
        <div className="bg-white/60 rounded-xl shadow-sm border border-indigo-100 flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white border rounded-lg">Sales stat</div>
              <div className="p-4 bg-white border rounded-lg">Revenue stat</div>
              <div className="p-4 bg-white border rounded-lg">Best Selling</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
