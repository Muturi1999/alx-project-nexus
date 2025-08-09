// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import Layout from '../../layouts/Layout';
// import { Star, ShoppingCart, Heart, Share2, Check } from 'lucide-react';
// import { useCart } from '../../context/CartContext';
// import { BOOKS } from '../../data/books';

// export default function BookDetails() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [isAddedToCart, setIsAddedToCart] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const cart = useCart();

//   if (!id) return <div>Loading...</div>;

//   const book = BOOKS.find((b) => b.id === Number(id));
//   if (!book) {
//     return (
//       <Layout>
//         <div className="max-w-7xl mx-auto px-4 py-12">Book not found.</div>
//       </Layout>
//     );
//   }

//   const handleAddToCart = () => {
//     const item = { id: book.id, title: book.title, price: book.price, image: book.image };
//     cart.addToCart(item, quantity);
//     setIsAddedToCart(true);
//     setTimeout(() => setIsAddedToCart(false), 2000);
//   };

//   const discount = book.originalPrice
//     ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
//     : 0;

//   return (
//     <Layout>
//       <Head>
//         <title>{book.title} - Books</title>
//         <meta name="description" content={book.title} />
//       </Head>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Breadcrumb */}
//         <nav className="text-sm mb-6">
//           <ol className="flex items-center space-x-2">
//             <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
//             <li className="text-gray-400">/</li>
//             <li><a href="/books" className="text-gray-500 hover:text-gray-700">Books</a></li>
//             <li className="text-gray-400">/</li>
//             <li className="text-gray-900">{book.title}</li>
//           </ol>
//         </nav>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {/* Book Image */}
//           <div className="relative">
//             <div className="sticky top-4">
//               <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
//                 <img
//                   src={(book.image || '/vercel.svg').replace('/240/320', '/400/600')}
//                   alt={book.title}
//                   className="w-full h-full object-cover rounded-lg shadow-xl"
//                 />
//                 {discount > 0 && (
//                   <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                     -{discount}%
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Book Info */}
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
//             <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

//             {/* Rating */}
//             <div className="flex items-center gap-4 mb-6">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < Math.floor(book.rating || 0)
//                         ? 'text-yellow-400 fill-current'
//                         : 'text-gray-300'
//                     }`}
//                   />
//                 ))}
//                 <span className="ml-2 text-gray-600">{book.rating}</span>
//               </div>
//               <span className="text-gray-400">|</span>
//               <span className="text-gray-600">{book.reviewCount} reviews</span>
//             </div>

//             {/* Price */}
//             <div className="mb-6">
//               <div className="flex items-baseline gap-3">
//                 <span className="text-3xl font-bold text-gray-900">Ksh.{book.price.toFixed(2)}</span>
//                 {book.originalPrice && (
//                   <span className="text-xl text-gray-500 line-through">
//                     Ksh.{Number(book.originalPrice).toFixed(2)}
//                   </span>
//                 )}
//               </div>
//               <p className={`mt-2 ${book.inStock !== false ? 'text-green-600' : 'text-red-600'}`}>
//                 {book.inStock !== false ? '✓ In Stock' : 'Out of Stock'}
//               </p>
//             </div>

//             {/* Add to Cart */}
//             <div className="flex gap-4 mb-8">
//               <div className="flex items-center border rounded-lg">
//                 <button
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="px-4 py-3 hover:bg-gray-100"
//                   aria-label="Decrease quantity"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                   className="w-16 text-center border-x py-3"
//                   min="1"
//                 />
//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="px-4 py-3 hover:bg-gray-100"
//                   aria-label="Increase quantity"
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 onClick={handleAddToCart}
//                 className={`flex-1 px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
//                   isAddedToCart ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
//                 }`}
//               >
//                 {isAddedToCart ? (
//                   <>
//                     <Check className="w-5 h-5" />
//                     Added to Cart
//                   </>
//                 ) : (
//                   <>
//                     <ShoppingCart className="w-5 h-5" />
//                     Add to Cart
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Description */}
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-3">Description</h2>
//               <p className="text-gray-700 leading-relaxed">
//                 This is a detailed description of the book...
//               </p>
//             </div>

//             {/* Optional Tags */}
//             {Array.isArray(book.tags) && book.tags.length > 0 && (
//               <div className="flex gap-2 mt-4 flex-wrap">
//                 {book.tags.map((tag) => (
//                   <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../layouts/Layout';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BOOKS } from '../../data/books';
import BookCover from '../../components/BookCover';

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cart = useCart();

  if (!id) return <div>Loading...</div>;

  const book = BOOKS.find((b) => b.id === Number(id));
  if (!book) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12">Book not found.</div>
      </Layout>
    );
  }

  const hasRealImage =
    book.image && typeof book.image === 'string' && !book.image.startsWith('/api/placeholder');

  const handleAddToCart = () => {
    const item = { id: book.id, title: book.title, price: book.price, image: hasRealImage ? book.image : null };
    cart.addToCart(item, quantity);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  return (
    <Layout>
      <Head>
        <title>{book.title} - Books</title>
        <meta name="description" content={book.title} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/books/all" className="text-gray-500 hover:text-gray-700">Books</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">{book.title}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Book Image / Generated Cover */}
          <div className="relative">
            <div className="sticky top-4">
              <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
                {hasRealImage ? (
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover rounded-lg shadow-xl"
                    priority
                  />
                ) : (
                  <BookCover
                    title={book.title}
                    author={book.author}
                    seed={book.id}
                    width={400}
                    height={600}
                    rounded="rounded-lg"
                    className="shadow-xl"
                  />
                )}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(book.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{book.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{book.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">Ksh.{book.price.toFixed(2)}</span>
                {book.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    Ksh.{Number(book.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
              <p className={`mt-2 ${book.inStock !== false ? 'text-green-600' : 'text-red-600'}`}>
                {book.inStock !== false ? '✓ In Stock' : 'Out of Stock'}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100"
                  aria-label="Decrease quantity"
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
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  isAddedToCart ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
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

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                This is a detailed description of the book...
              </p>
            </div>

            {/* Optional Tags */}
            {Array.isArray(book.tags) && book.tags.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {book.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
