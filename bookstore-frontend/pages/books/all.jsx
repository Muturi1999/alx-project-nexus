"use client";

import { useMemo } from "react";
import { useRouter } from "next/router";
import Layout from "../../layouts/Layout";
import { BOOKS } from "../../data/books";
import BookCard from "../../components/BookCard";

export default function AllBooksPage() {
  const router = useRouter();
  const category = (router.query.category || "").toString();

  const { title, books } = useMemo(() => {
    if (category === "new-releases") {
      return {
        title: "New Releases",
        books: BOOKS.filter((b) => b.isNewRelease),
      };
    }
    if (category === "bestsellers") {
      // Prefer explicit flag. If none flagged, fall back to a "popular" heuristic.
      const flagged = BOOKS.filter((b) => b.isBestseller);
      const list =
        flagged.length > 0
          ? flagged
          : [...BOOKS].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 8);
      return { title: "Bestsellers", books: list };
    }
    return { title: "All Books", books: BOOKS };
  }, [category]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          {/* Optional: show count */}
          <span className="text-sm text-gray-500">{books.length} item(s)</span>
        </div>

        {books.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-600">
            No books found in this category.
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
