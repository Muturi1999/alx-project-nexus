// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import Layout from '../../layouts/Layout';
// import Link from 'next/link';

// const mockBooks = [
//   {
//     id: 1,
//     title: 'The Lost Something: A Story About Letting Go',
//     author: 'Justin Bieber',
//     price: 1500.0,
//     originalPrice: null,
//     rating: 4.8,
//     reviewCount: 234,
//     image: 'https://placehold.co/400x600',
//     description: 'A compelling story about finding peace after loss.',
//     category: 'Fiction',
//     pages: 240,
//     inStock: true,
//     tags: ['Fiction', 'Letting Go', 'Life'],
//   },
//   {
//     id: 2,
//     title: 'Goal of Life',
//     author: 'Debby Muturi',
//     price: 1200.0,
//     originalPrice: 1699,
//     rating: 4.6,
//     reviewCount: 156,
//     image: 'https://placehold.co/400x600',
//     description: 'Discover your life purpose with practical wisdom.',
//     category: 'Self Help',
//     pages: 200,
//     inStock: true,
//     tags: ['Self Help', 'Motivation', 'Purpose'],
//   },
//   {
//       id: 3,
//       title: "Learning React: Modern Patterns for Developing React Apps",
//       author: "Alex Kamau",
//       price: 456.00,
//       originalPrice: null,
//       rating: 4.7,
//       reviewCount: 89,
//       image: "/api/placeholder/240/320",
//       category: "Technology"
//     },
//     {
//       id: 4,
//       title: "The Silent Things: A Novel",
//       author: "Jacob Alliet",
//       price: 780.00,
//       originalPrice: 22.99,
//       rating: 4.5,
//       reviewCount: 312,
//       image: "/api/placeholder/240/320",
//       category: "Fiction"
//     },
//     {
//       id: 5,
//       title: "Mountain Stories",
//       author: "Sarah Towwet",
//       price: 544.00,
//       originalPrice: null,
//       rating: 4.3,
//       reviewCount: 78,
//       image: "/api/placeholder/240/320",
//       category: "Adventure"
//     },
//     {
//       id: 6,
//       title: "The Psychology of Money",
//       author: "Morgan Reagan",
//       price: 365.00,
//       originalPrice: null,
//       rating: 4.9,
//       reviewCount: 567,
//       image: "/api/placeholder/240/320",
//       category: "Finance"
//     },
//     {
//       id: 7,
//       title: "Atomic Habits",
//       author: "James Irungu",
//       price: 800.00,
//       originalPrice: null,
//       rating: 4.8,
//       reviewCount: 1234,
//       image: "/api/placeholder/240/320",
//       category: "Self Help"
//     },
//     {
//       id: 8,
//       title: "The Seven Husbands of Evelyn Hugo",
//       author: "Taylor ",
//       price: 600.00,
//       originalPrice: 19.99,
//       rating: 4.7,
//       reviewCount: 892,
//       image: "/api/placeholder/240/320",
//       category: "Fiction"
//     }
// ];

// export default function BookDetail() {
//   const router = useRouter();
//   const { id } = router.query;

//   const book = mockBooks.find((b) => b.id === Number(id));

//   if (!book) {
//     return (
//       <Layout>
//         <div className="p-10 text-center text-gray-600">
//           <h1 className="text-2xl font-semibold">Book not found</h1>
//           <Link href="/books/all" className="text-purple-600 underline mt-4 block">
//             Return to all books
//           </Link>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
//         <div>
//           <Image
//             src={book.image}
//             width={400}
//             height={600}
//             alt={book.title}
//             className="rounded shadow"
//           />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
//           <p className="text-gray-600 text-lg mb-4">by {book.author}</p>

//           <div className="text-purple-600 text-2xl font-semibold mb-2">
//             Ksh {book.price.toFixed(2)}
//             {book.originalPrice && (
//               <span className="text-gray-500 line-through text-lg ml-3">
//                 Ksh {book.originalPrice.toFixed(2)}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center mb-4">
//             <span className="text-yellow-500">Rating: {book.rating} ★</span>
//             <span className="ml-2 text-gray-500">({book.reviewCount} reviews)</span>
//           </div>

//           <p className="mb-4 text-gray-700">{book.description}</p>

//           <p className="mb-2 text-sm text-gray-600">Category: {book.category}</p>
//           <p className="mb-2 text-sm text-gray-600">Pages: {book.pages}</p>

//           <div className="flex gap-2 mt-4 flex-wrap">
//             {book.tags.map((tag) => (
//               <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
//                 {tag}
//               </span>
//             ))}
//           </div>

//           <button className="mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../layouts/Layout';
import { Star, ShoppingCart, Heart, Share2, Check } from 'lucide-react';

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Using your existing mock book structure
  const mockBook = {
    id: parseInt(id),
    title: `Book Title ${id}`,
    author: 'Author Name',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 234,
    image: '/api/placeholder/400/600',
    description: 'This is a detailed description of the book...',
    category: 'Fiction',
    inStock: true
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    // Add actual cart logic here
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const discount = mockBook.originalPrice 
    ? Math.round(((mockBook.originalPrice - mockBook.price) / mockBook.originalPrice) * 100)
    : 0;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{mockBook.title} - Books</title>
        <meta name="description" content={mockBook.description} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/books" className="text-gray-500 hover:text-gray-700">Books</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">{mockBook.title}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Book Image */}
          <div className="relative">
            <div className="sticky top-4">
              <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
                <img
                  src={mockBook.image}
                  alt={mockBook.title}
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Book Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockBook.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {mockBook.author}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(mockBook.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{mockBook.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{mockBook.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">${mockBook.price}</span>
                {mockBook.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${mockBook.originalPrice}
                  </span>
                )}
              </div>
              {mockBook.inStock ? (
                <p className="text-green-600 mt-2">✓ In Stock</p>
              ) : (
                <p className="text-red-600 mt-2">Out of Stock</p>
              )}
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x py-3"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  isAddedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{mockBook.description}</p>
            </div>

            {/* Tags - with defensive check */}
            {mockBook.tags && mockBook.tags.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {mockBook.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Extended Description - with defensive check */}
        {mockBook.longDescription && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About this book</h2>
            <p className="text-gray-700 leading-relaxed">{mockBook.longDescription}</p>
          </div>
        )}

        {/* Product Details - with defensive check */}
        {mockBook.details && (
          <div className="mb-12 bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <dl className="grid md:grid-cols-2 gap-4">
              {Object.entries(mockBook.details).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </dt>
                  <dd className="font-semibold text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Features - with defensive check */}
        {mockBook.features && mockBook.features.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {mockBook.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}