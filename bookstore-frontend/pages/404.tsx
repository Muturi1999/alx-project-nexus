// import React from 'react';
import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/layouts/Layout';
import { Home, Search, BookOpen, ArrowLeft } from 'lucide-react';

const Custom404: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>404 - Page Not Found | Books</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* 404 Large Text */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {/* It seems like you&apos;ve wandered off the beaten path. The page you&apos;re  */}
              looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Primary Action - Home Page */}
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/books/all"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Books
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </button>
            </div>
          </div>

          {/* Search Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Or search for what you&apos;re looking for:
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search books, authors..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const query = (e.target as HTMLInputElement).value;
                    if (query.trim()) {
                      window.location.href = `/books/all?search=${encodeURIComponent(query)}`;
                    }
                  }
                }}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Popular Links */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/books/all?category=new-releases" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">
                New Releases
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/books/all?category=bestsellers" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">
                Bestsellers
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/books/all?category=fiction" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">
                Fiction
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/cart" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-red-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
    </Layout>
  );
};

export default Custom404;