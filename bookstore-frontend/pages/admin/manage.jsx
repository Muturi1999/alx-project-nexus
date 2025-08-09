"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "../../components/AdminSidebar";
import { BOOKS } from "../../data/books";

export default function ManageBooks() {
  const router = useRouter();

  useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      if (!auth) router.replace("/login");
    } catch {
      router.replace("/login");
    }
  }, [router]);

  const rows = BOOKS.map((b, i) => ({
    sn: i + 1,
    title: b.title,
    author: b.author,
    category: b.category,
    price: b.price,
    image: b.image,
    id: b.id,
  }));

  const safeImg = (img) =>
    !img || (typeof img === "string" && img.startsWith("/api/placeholder")) ? "/vercel.svg" : img;

  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="max-w-[1400px] mx-auto py-6">
        <div className="bg-white/60 rounded-xl shadow-sm border border-indigo-100 flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Books</h1>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">S.N.</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Book Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Author Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">{r.sn}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={safeImg(r.image)} alt={r.title} className="w-8 h-10 object-cover rounded" />
                          <span className="text-sm font-medium text-gray-900">{r.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.author}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Ksh.{Number(r.price).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 text-xs rounded bg-blue-50 text-blue-700 hover:bg-blue-100">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-xs rounded bg-red-50 text-red-700 hover:bg-red-100">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
