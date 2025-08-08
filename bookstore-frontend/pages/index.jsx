import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../layouts/Layout';
import BookSection from '../components/BookSection';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { ArrowRight } from 'lucide-react';
import { BOOKS } from '../data/books';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // use shared data
  const mockBooks = BOOKS;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const newReleases = mockBooks.slice(0, 6);
  const topRated = mockBooks.slice(2, 8);
  const ourSuggestion = mockBooks.slice(1, 7);
  const mostPopular = mockBooks.slice(3, 8);

  return (
    <Layout>
      <Head>
        <title>Books - Find Your Favorite</title>
        <meta
          name="description"
          content="Discover amazing books from our collection of 1200+ titles"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Find Your Favorite
                <span className="flex items-center mt-2">
                  <ArrowRight className="h-8 w-8 md:h-10 md:w-10 mr-4" />
                  <span className="text-3xl md:text-4xl lg:text-5xl">1200+ Books Available</span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed">
                Discover amazing stories, learn new skills, and explore different worlds through our carefully curated collection.
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 transform rotate-3 hover:rotate-6 transition-transform">
                    <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md"></div>
                    <div className="mt-2 space-y-1">
                      <div className="h-2 bg-white/40 rounded w-3/4"></div>
                      <div className="h-2 bg-white/30 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 transform -rotate-2 hover:-rotate-4 transition-transform">
                    <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md"></div>
                    <div className="mt-2 space-y-1">
                      <div className="h-2 bg-white/40 rounded w-2/3"></div>
                      <div className="h-2 bg-white/30 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 transform -rotate-1 hover:-rotate-3 transition-transform">
                    <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-md"></div>
                    <div className="mt-2 space-y-1">
                      <div className="h-2 bg-white/40 rounded w-full"></div>
                      <div className="h-2 bg-white/30 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 transform rotate-2 hover:rotate-4 transition-transform">
                    <div className="h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-md"></div>
                    <div className="mt-2 space-y-1">
                      <div className="h-2 bg-white/40 rounded w-5/6"></div>
                      <div className="h-2 bg-white/30 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2 animate-bounce">
                <span className="text-lg">📚</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 animate-pulse">
                <span className="text-lg">✨</span>
              </div>
            </div>
          </div>
        </div>

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
