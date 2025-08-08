"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "../../components/AdminSidebar";
import { BOOKS } from "../../data/books";
import {
  BookOpen,
  Layers,
  DollarSign,
  Star,
  TrendingUp,
  BarChart3,
  Upload,
  Users,
  Package,
  HelpCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";

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

  const {
    totalBooks,
    categoriesCount,
    avgPrice,
    avgRating,
    booksPerCategory,
    topBooks,
    insights,
  } = useMemo(() => {
    const totalBooks = BOOKS.length;

    const categoriesCount = new Set(BOOKS.map((b) => b.category)).size;

    const avgPrice =
      totalBooks === 0
        ? 0
        : BOOKS.reduce((s, b) => s + Number(b.price || 0), 0) / totalBooks;

    const avgRating =
      totalBooks === 0
        ? 0
        : BOOKS.reduce((s, b) => s + Number(b.rating || 0), 0) / totalBooks;

    // books per category (for bar chart)
    const catMap = BOOKS.reduce((acc, b) => {
      acc[b.category] = (acc[b.category] || 0) + 1;
      return acc;
    }, {});
    const booksPerCategory = Object.entries(catMap).map(([category, count]) => ({
      category,
      count,
    }));

    // “bestsellers” proxy: highest reviewCount (ties by rating)
    const topBooks = [...BOOKS]
      .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0) || (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);

    const maxCat = booksPerCategory.reduce(
      (m, c) => (c.count > m.count ? c : m),
      { category: "-", count: 0 }
    );

    const insights = [
      `Top category: ${maxCat.category} (${maxCat.count} title${maxCat.count === 1 ? "" : "s"})`,
      `Average price: Ksh. ${avgPrice.toFixed(2)}`,
      `Average rating: ${avgRating.toFixed(2)} / 5`,
    ];

    return {
      totalBooks,
      categoriesCount,
      avgPrice,
      avgRating,
      booksPerCategory,
      topBooks,
      insights,
    };
  }, []);

  const maxBar = Math.max(...booksPerCategory.map((x) => x.count), 1);

  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="max-w-[1400px] mx-auto py-6">
        <div className="bg-white/60 rounded-xl shadow-sm border border-indigo-100 flex">
          <AdminSidebar />

          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Link
                href="/admin/manage"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <BarChart3 className="h-4 w-4" />
                View Reports
              </Link>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              <KPI
                icon={BookOpen}
                title="Total Books"
                value={totalBooks}
                hint="Titles in catalog"
                iconClass="text-indigo-600"
              />
              <KPI
                icon={Layers}
                title="Categories"
                value={categoriesCount}
                hint="Distinct genres"
                iconClass="text-emerald-600"
              />
              <KPI
                icon={DollarSign}
                title="Avg. Price"
                value={`Ksh. ${avgPrice.toFixed(2)}`}
                hint="Per title"
                iconClass="text-amber-600"
              />
              <KPI
                icon={Star}
                title="Avg. Rating"
                value={`${avgRating.toFixed(2)}/5`}
                hint="Across catalog"
                iconClass="text-rose-600"
              />
            </div>

            {/* Grid: Chart + Table + Insights */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="bg-white border rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-indigo-600" /> Books per Category
                  </h2>
                </div>
                <div className="space-y-3">
                  {booksPerCategory.map((row) => {
                    const width = (row.count / maxBar) * 100;
                    return (
                      <div key={row.category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{row.category}</span>
                          <span className="text-gray-500">{row.count}</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded">
                          <div
                            className="h-3 rounded bg-indigo-500"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Books */}
              <div className="bg-white border rounded-lg p-5 xl:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Star className="h-4 w-4 text-rose-600" /> Top Performing Books
                  </h2>
                  <Link
                    href="/admin/manage"
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Manage books
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-600 border-b">
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Author</th>
                        <th className="py-2 pr-4">Category</th>
                        <th className="py-2 pr-4">Rating</th>
                        <th className="py-2 pr-4">Reviews</th>
                        <th className="py-2 pr-4">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topBooks.map((b) => (
                        <tr key={b.id} className="border-b last:border-0">
                          <td className="py-2 pr-4 font-medium text-gray-900">{b.title}</td>
                          <td className="py-2 pr-4 text-gray-700">{b.author}</td>
                          <td className="py-2 pr-4 text-gray-700">{b.category}</td>
                          <td className="py-2 pr-4 text-gray-700">{(b.rating ?? 0).toFixed(1)}</td>
                          <td className="py-2 pr-4 text-gray-700">{b.reviewCount ?? 0}</td>
                          <td className="py-2 pr-4 text-gray-900">Ksh.{Number(b.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Insights + Quick Actions */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
              <div className="bg-white border rounded-lg p-5">
                <h2 className="font-semibold text-gray-900 mb-3">Highlights</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {insights.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border rounded-lg p-5 xl:col-span-2">
                <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  <QuickAction href="/admin/manage" label="Manage Books" Icon={BookOpen} />
                  <QuickAction href="/admin/upload" label="Upload" Icon={Upload} />
                  <QuickAction href="/admin/users" label="Users" Icon={Users} />
                  <QuickAction href="/admin/products" label="Products" Icon={Package} />
                  <QuickAction href="/admin/help" label="Help" Icon={HelpCircle} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------- little helper components ---------- */

function KPI({ icon: Icon, title, value, hint, iconClass }) {
  return (
    <div className="p-4 bg-white border rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{hint}</p>
        </div>
        <div className={`p-3 rounded-full bg-gray-50 ${iconClass}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function QuickAction({ href, label, Icon }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
    >
      <Icon className="h-4 w-4 text-indigo-600" />
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </Link>
  );
}
