// app/books/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { Star, Clock, BookOpen, Award } from 'lucide-react';
import AddToCartButton from '@/components/books/AddToCartButton';
import BookReviews from '@/components/books/BookReviews';
import RelatedBooks from '@/components/books/RelatedBooks';

// This would typically come from a database
const getBookById = async (id: string) => {
  // Mock data - replace with actual API call
  const books = {
    '1': {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviewCount: 2847,
      coverImage: '/api/placeholder/400/600',
      description: `A masterpiece of American literature, The Great Gatsby captures the essence of the Jazz Age. Set in the summer of 1922, the novel follows the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan. Through the eyes of narrator Nick Carraway, Fitzgerald paints a portrait of wealth, love, and the American Dream gone awry.`,
      longDescription: `F. Scott Fitzgerald's The Great Gatsby is widely considered to be the greatest American novel ever written. Set in the Jazz Age on Long Island and in New York City, the novel tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth. 

      The story is narrated by Nick Carraway, who moves to West Egg, Long Island, and becomes Gatsby's neighbor. Through Nick's eyes, we witness the extravagant parties, the complex relationships, and the ultimate tragedy that unfolds. Fitzgerald's prose is both beautiful and haunting, capturing the excess and disillusionment of the Roaring Twenties.`,
      features: [
        'Classic American Literature',
        'Beautifully Written Prose',
        'Timeless Themes',
        'Cultural Significance'
      ],
      details: {
        publisher: 'Scribner',
        publicationDate: 'April 10, 1925',
        language: 'English',
        paperback: '180 pages',
        isbn10: '0743273567',
        isbn13: '978-0743273565',
        dimensions: '5.5 x 0.5 x 8.5 inches',
        weight: '7.2 ounces'
      },
      inStock: true,
      category: 'Classic Literature',
      tags: ['American Literature', 'Classic', '1920s', 'Romance', 'Tragedy']
    }
  };

  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return books[id as keyof typeof books] || null;
};

export default async function BookDetailsPage({
  params
}: {
  params: { id: string }
}) {
  const book = await getBookById(params.id);

  if (!book) {
    notFound();
  }

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-2">
          <li><a href="/home" className="text-gray-500 hover:text-gray-700">Home</a></li>
          <li className="text-gray-400">/</li>
          <li><a href="/books" className="text-gray-500 hover:text-gray-700">Books</a></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900">{book.title}</li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Book Cover */}
        <div className="relative">
          <div className="sticky top-4">
            <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover rounded-lg shadow-xl"
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}%
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Book Information */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(book.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">{book.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{book.reviewCount.toLocaleString()} reviews</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">${book.price}</span>
              {book.originalPrice > book.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${book.originalPrice}
                </span>
              )}
            </div>
            {book.inStock ? (
              <p className="text-green-600 mt-2">✓ In Stock</p>
            ) : (
              <p className="text-red-600 mt-2">Out of Stock</p>
            )}
          </div>

          {/* Add to Cart */}
          <AddToCartButton book={book} />

          {/* Quick Features */}
          <div className="grid grid-cols-2 gap-4 mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Reading Time</p>
                <p className="font-semibold">3-4 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Pages</p>
                <p className="font-semibold">{book.details.paperback}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{book.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-semibold">{book.rating}/5</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">About this book</h2>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extended Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <div className="prose max-w-none">
          {book.longDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <dl className="grid md:grid-cols-2 gap-4">
          {Object.entries(book.details).map(([key, value]) => (
            <div key={key}>
              <dt className="text-sm text-gray-500 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </dt>
              <dd className="font-semibold text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Reviews Section */}
      <BookReviews bookId={book.id} />

      {/* Related Books */}
      <RelatedBooks currentBookId={book.id} category={book.category} />
    </div>
  );
}