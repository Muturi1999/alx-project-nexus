"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "../../components/AdminSidebar";
import { Eye, Filter, X } from "lucide-react";
import { BOOKS } from "../../data/books"; // adjust if your path differs

// ---- helpers ---------------------------------------------------
const STATUSES = ["Completed", "Pending", "Rejected", "Returned"];

// pick a random status for demo
const pickStatus = (i) => STATUSES[i % STATUSES.length];

// make a random-ish Nairobi-ish date in the last ~90 days
function randomDate(seed = 0) {
  const now = new Date();
  const past = new Date(now);
  const offset = 5 + ((seed * 37) % 90); // spread them a bit
  past.setDate(now.getDate() - offset);
  past.setHours(10 + (seed % 8), (seed * 11) % 60, 0, 0);
  return past;
}

// format Ksh
const ksh = (n) => `Ksh.${Number(n).toFixed(2)}`;

// simple date->YYYY-MM-DD for inputs
const yyyyMmDd = (d) => {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = `${dt.getMonth() + 1}`.padStart(2, "0");
  const da = `${dt.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${da}`;
};

// fake customers from your authors/titles
const toCustomer = (book, i) => {
  const baseName = book.author || "Customer";
  const name =
    baseName.trim().length > 1 ? baseName : `Customer ${book.id || i + 1}`;
  const email = `${name.toLowerCase().replace(/\s+/g, ".")}@books.com`;
  const phone = `+2547${String(1000000 + ((i * 9137) % 8999999))}`;
  return { name, email, phone };
};

// ---- main component --------------------------------------------
export default function AdminOrdersPage() {
  const router = useRouter();

  // auth guard
  useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      if (!auth) router.replace("/login");
    } catch {
      router.replace("/login");
    }
  }, [router]);

  // build 20-ish dummy orders from BOOKS
  const orders = useMemo(() => {
    const pool = [...BOOKS, ...BOOKS]; // repeat to have more variety
    const size = Math.min(20, Math.max(8, pool.length));
    const list = Array.from({ length: size }).map((_, i) => {
      // choose 1-3 items per order
      const itemCount = 1 + (i % 3);
      const items = [];
      let total = 0;

      for (let j = 0; j < itemCount; j++) {
        const b = pool[(i * 3 + j) % pool.length];
        const qty = 1 + ((i + j) % 2);
        const price = Number(b.price) || 0;
        items.push({
          id: b.id,
          title: b.title,
          price,
          quantity: qty,
        });
        total += price * qty;
      }

      const first = pool[i % pool.length];
      const customer = toCustomer(first, i);

      return {
        id: 1000 + i,
        date: randomDate(i),
        status: pickStatus(i),
        total,
        items,
        customer,
      };
    });

    // newest first
    return list.sort((a, b) => b.date - a.date);
  }, []);

  // filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // modal
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;

      if (dateFrom) {
        const f = new Date(dateFrom);
        if (o.date < new Date(f.setHours(0, 0, 0, 0))) return false;
      }
      if (dateTo) {
        const t = new Date(dateTo);
        if (o.date > new Date(t.setHours(23, 59, 59, 999))) return false;
      }
      return true;
    });
  }, [orders, statusFilter, dateFrom, dateTo]);

  const resetFilters = () => {
    setStatusFilter("All");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="max-w-[1400px] mx-auto py-6">
        <div className="bg-white/60 rounded-xl shadow-sm border border-indigo-100 flex">
          <AdminSidebar />

          <main className="flex-1 p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold">Orders</h1>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Filters</span>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="All">All Statuses</option>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                {(statusFilter !== "All" || dateFrom || dateTo) && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 text-sm text-gray-700 border rounded-lg px-3 py-2 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Order #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr key={o.id} className="border-t">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        #{o.id}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(o.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-col">
                          <span className="text-gray-900">{o.customer.name}</span>
                          <span className="text-gray-500 text-xs">{o.customer.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {o.items.length} item{o.items.length > 1 ? "s" : ""}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold">{ksh(o.total)}</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <button
                          onClick={() => setSelected(o)}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                          title="View"
                        >
                          <Eye className="h-4 w-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-sm text-gray-500"
                      >
                        No orders match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* View Modal */}
            {selected && (
              <OrderModal order={selected} onClose={() => setSelected(null)} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ---- components ------------------------------------------------
function StatusBadge({ status }) {
  const style =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
      ? "bg-amber-100 text-amber-700"
      : status === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700"; // Returned
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}

function OrderModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Order #{order.id}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Info label="Date" value={new Date(order.date).toLocaleString()} />
            <Info label="Status" value={<StatusBadge status={order.status} />} />
            <Info label="Total" value={<span className="font-semibold">{ksh(order.total)}</span>} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold mb-2">Customer</h4>
              <p className="text-sm text-gray-900">{order.customer.name}</p>
              <p className="text-sm text-gray-600">{order.customer.email}</p>
              <p className="text-sm text-gray-600">{order.customer.phone}</p>
            </div>

            <div className="border rounded-lg p-3">
              <h4 className="font-semibold mb-2">Items</h4>
              <ul className="space-y-2">
                {order.items.map((it) => (
                  <li key={it.id} className="text-sm flex justify-between">
                    <span className="text-gray-700">
                      {it.title} × {it.quantity}
                    </span>
                    <span className="font-medium">{ksh(it.price * it.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border rounded-lg p-3">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
