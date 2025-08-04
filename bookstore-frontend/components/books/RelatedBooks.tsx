'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
}

interface RelatedBooksProps {
  currentBookId: string;
  category: string;
}

// Mock data - replace with API call
const mockRelatedBooks: Book[] = [
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviewCount: 3521,
    coverImage: '/api/placeholder/200/300'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    price: 26.99,
    originalPrice: 32.99,
    rating: 4.6,
    reviewCount: 4892,
    coverImage: '/api/placeholder/200/300'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 22.99,
    rating: 4.5,
    reviewCount: 2765,
    coverImage: '/api/placeholder/200/300'
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 25.99,
    originalPrice: 31.99,
    rating: 4.3,
    reviewCount: 2134,
    coverImage: '/api/placeholder/200/300'
  },
  {
    id: '6',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    price: 27.99,
    rating: 4.4,
    reviewCount: 1876,
    coverImage: '/api/placeholder/200/300'
  },
  {
    id: '7',
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    price: 23.99,
    originalPrice: 28.99,
    rating: 4.6,
    reviewCount: 2987,
    coverImage: '/api/placeholder/200/300'
  }
];

export default function RelatedBooks({ currentBookId, category }: RelatedBooksProps) {
  const [relatedBooks] = useState<Book[]>(
    mockRelatedBooks.filter(book => book.id !== currentBookId)
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {relatedBooks.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="flex-shrink-0 w-48 group"
            >
              <div className="relative aspect-[2/3] mb-3 overflow-hidden rounded-lg">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {book.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{book.author}</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(book.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({book.reviewCount})</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold">${book.price}</span>
                {book.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${book.originalPrice}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}