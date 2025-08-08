"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "../../components/AdminSidebar";

export default function HelpPage() {
  const router = useRouter();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    if (!auth) router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="max-w-[1400px] mx-auto py-6">
        <div className="bg-white/60 rounded-xl shadow-sm border border-indigo-100 flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Help</h1>
            <div className="p-6 bg-white border rounded-lg">Need help? Email support@example.com</div>
          </main>
        </div>
      </div>
    </div>
  );
}
