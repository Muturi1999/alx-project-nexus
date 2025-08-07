import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';

export default function BookNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <BookOpen className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find the book you&apos;re looking for. It may have been removed or the link might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search className="w-5 h-5" />
            Browse All Books
          </Link>
          
          <div className="text-gray-500">
            or
          </div>
          
          <Link
            href="/"
            className="inline-block text-blue-600 hover:text-blue-800 underline"
          >
            Return to Homepage
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Popular Categories</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Biography'].map((category) => (
              <Link
                key={category}
                href={`/books?category=${category.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 bg-white border rounded-full hover:bg-gray-100 transition-colors text-sm"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}