"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutDashboard, Upload, BookOpen, Users, Package, HelpCircle, LogOut, ListOrdered } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminSidebar() {
  const router = useRouter();
  const [active, setActive] = useState("/admin");

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  const navItem = (href, label, Icon) => {
    const isActive = active === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
          isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    );
  };

  const handleLogout = () => {
    try { localStorage.removeItem("auth"); } catch {}
    router.push("/login");
  };

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 p-4">
      <div className="text-2xl font-bold mb-6">Muturi Reads</div>
      <nav className="space-y-1">
        {navItem("/admin", "Dashboard", LayoutDashboard)}
        {navItem("/admin/upload", "Upload Books", Upload)}
        {navItem("/admin/manage", "Manage Books", BookOpen)}
        {navItem("/admin/users", "Users", Users)}
        {navItem("/admin/orders", "Orders", ListOrdered)}
        {navItem("/admin/help", "Help", HelpCircle)}
        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
