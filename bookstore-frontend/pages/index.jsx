import { useState, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../layouts/Layout';
import BookSection from '../components/BookSection';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Search, MoreVertical } from 'lucide-react'; // ⬅️ changed here
import { BOOKS } from '../data/books';

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function onDocClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return BOOKS.filter(
      (b) =>
        String(b.title).toLowerCase().includes(q) ||
        String(b.author).toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/books/${results[0].id}`);
      setOpen(false);
      setQuery('');
    } else {
      setOpen(true);
    }
  };

  const mockBooks = BOOKS;
  const newReleases = mockBooks.slice(0, 6);
  const topRated = mockBooks.slice(2, 8);
  const ourSuggestion = mockBooks.slice(1, 7);
  const mostPopular = mockBooks.slice(3, 8);

  return (
    <Layout>
      <Head>
        <title>Books - Find Your Favorite</title>
        <meta name="description" content="Discover amazing books from our collection of 1200+ titles" />
      </Head>

      {/* Hero */}
      <section className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                Buy and sell your
                <br />
                books <span className="text-indigo-600">for the best</span>
                <br />
                prices
              </h1>

              <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
                Find and read more you’ll love, and keep track of the books you want to read.
                Be part of the world&apos;s largest community of book lovers.
              </p>

              {/* Search (with dropdown suggestions) */}
              <div className="mt-6 relative max-w-xl" ref={searchRef}>
                <form onSubmit={handleHeroSearch} className="relative w-full">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder="Search for Books, authors…"
                    className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Search books, authors"
                  />
                  <button
                    type="button"
                    className="absolute right-1 top-1.5 inline-flex items-center justify-center h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-50"
                    aria-label="More search options"
                  >
                    <MoreVertical className="h-5 w-5" /> {/* ⬅️ changed here */}
                  </button>
                </form>

                {open && (
                  <div className="absolute z-40 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {query.trim() && results.length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-600">No books found</div>
                    )}
                    {results.map((b) => {
                      const safeImage =
                        !b.image || (typeof b.image === 'string' && b.image.startsWith('/api/placeholder'))
                          ? '/vercel.svg'
                          : b.image;
                      return (
                        <Link
                          key={b.id}
                          href={`/books/${b.id}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setQuery('');
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={safeImage} alt={b.title} className="w-8 h-10 object-cover rounded" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{b.title}</p>
                            <p className="text-xs text-gray-600 truncate">by {b.author}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Visual / stacked cards */}
            <div className="relative">
              <div className="absolute right-10 top-8 h-80 w-56 rounded-3xl rotate-6 bg-gradient-to-br from-fuchsia-400 to-pink-600 shadow-xl opacity-80" />
              <div className="absolute right-16 top-4 h-80 w-56 rounded-3xl -rotate-3 bg-gradient-to-br from-green-400 to-emerald-600 shadow-xl opacity-90" />
              <div className="relative ml-auto h-80 w-56 rounded-3xl bg-white shadow-2xl overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-600" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60">
                  <p className="text-white/80 text-xs tracking-widest">Mike Muturi</p>
                  <h4 className="text-white text-2xl font-semibold mt-1"> POWER OF<br/>GRIT</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Book Sections */}
      <div className="bg-gray-50 pt-8">
        {isLoading ? (
          <div className="space-y-2">
            <LoadingSkeleton count={5} />
            <LoadingSkeleton count={5} />
            <LoadingSkeleton count={5} />
            <LoadingSkeleton count={5} />
          </div>
        ) : (
          <div className="space-y-2">
            <BookSection title="New Releases" books={newReleases} />
            <BookSection title="Top Rated Books" books={topRated} />
            <BookSection title="Our Suggestion" books={ourSuggestion} />
            <BookSection title="Most Popular Books" books={mostPopular} />
          </div>
        )}
      </div>
    </Layout>
  );
}
