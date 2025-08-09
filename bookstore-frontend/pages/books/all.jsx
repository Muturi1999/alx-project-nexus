"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";
import Layout from "../../layouts/Layout";
import { BOOKS } from "../../data/books";
import BookCard from "../../components/BookCard";

export default function AllBooksPage() {
  const router = useRouter();
  const category = (router.query.category || "").toString();

  // pick up ?query= from URL so refreshing keeps the search
  const [term, setTerm] = useState("");
  useEffect(() => {
    setTerm((router.query.query || "").toString());
  }, [router.query.query]);

  // base list by category
  const base = useMemo(() => {
    if (category === "new-releases") return BOOKS.filter((b) => b.isNewRelease);
    if (category === "bestsellers") {
      const flagged = BOOKS.filter((b) => b.isBestseller);
      return flagged.length
        ? flagged
        : [...BOOKS]
            .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
            .slice(0, 12);
    }
    return BOOKS;
  }, [category]);

  // apply search term to base list
  const books = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (b) =>
        String(b.title).toLowerCase().includes(q) ||
        String(b.author).toLowerCase().includes(q) ||
        String(b.category || "").toLowerCase().includes(q)
    );
  }, [base, term]);

  const pageTitle =
    category === "new-releases"
      ? "New Releases"
      : category === "bestsellers"
      ? "Bestsellers"
      : "All Books";

  const handleSearch = (e) => {
    e.preventDefault();
    // keep category in URL, update query param
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (term.trim()) params.set("query", term.trim());
    router.push(`/books/all${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <Layout>
              {/* Hero section */}
      <section
        className="w-full"
        style={{ backgroundColor: "#F5F5F7" }} // from screenshot
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Find Your Favorite —{" "}
                <span className="font-black">1200+ Books Available</span>
              </h1>

              {/* Search */}
              <form onSubmit={handleSearch} className="mt-4 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search for Books..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </form>
            </div>

            {/* right illustration */}
            <div className="hidden md:flex justify-end">
              <div className="w-72 h-44 bg-gradient-to-tr from-purple-300 via-pink-300 to-orange-200 rounded-2xl shadow-inner flex items-end justify-center">
                <div className="flex items-end gap-2 pb-4">
                  <div className="w-10 h-20 bg-purple-500 rounded-sm shadow" />
                  <div className="w-10 h-24 bg-pink-500 rounded-sm shadow" />
                  <div className="w-10 h-28 bg-orange-400 rounded-sm shadow -rotate-6" />
                  <div className="w-10 h-24 bg-blue-400 rounded-sm shadow" />
                  <div className="w-10 h-28 bg-yellow-400 rounded-sm shadow rotate-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{pageTitle}</h2>
          <span className="text-sm text-gray-500">{books.length} item(s)</span>
        </div>

        {books.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-600">
            No books found{term.trim() ? ` for “${term.trim()}”` : ""}.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

