// import Link from 'next/link';
// import Image from 'next/image';
// import { Star, ShoppingCart } from 'lucide-react';

// const BookCard = ({ book }) => {
//   const { id, title, author, price, originalPrice, rating, reviewCount, image } = book;

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative">
//             <Star className="h-3 w-3 text-gray-300 fill-current" />
//             <div className="absolute top-0 left-0 overflow-hidden w-1/2">
//               <Star className="h-3 w-3 text-yellow-400 fill-current" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-3 w-3 text-gray-300 fill-current" />);
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex-shrink-0 w-48 group">
//       <div className="relative">
//         <Link href={`/books/${id}`}>
//           <div className="aspect-[3/4] relative overflow-hidden cursor-pointer">
//             <Image
//               src={image || '/api/placeholder/240/320'}
//               alt={title}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         </Link>
//       </div>

//       <div className="p-3">
//         <Link href={`/books/${id}`}>
//           <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 hover:text-purple-600 transition-colors cursor-pointer leading-tight">
//             {title}
//           </h3>
//         </Link>

//         <p className="text-gray-600 text-xs mb-2">{author}</p>

//         <div className="flex items-center space-x-1 mb-2">
//           <div className="flex items-center">
//             {renderStars(rating)}
//           </div>
//           <span className="text-xs text-gray-500">({reviewCount})</span>
//         </div>

//         <div className="flex items-center space-x-2 mb-3">
//           <span className="text-lg font-bold text-gray-900">Ksh.{price}</span>
//           {originalPrice && originalPrice > price && (
//             <span className="text-sm text-gray-500 line-through">Ksh.{originalPrice}</span>
//           )}
//         </div>

//         <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
//           <ShoppingCart className="h-4 w-4" />
//           <span>Add to Cart</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookCard;

// import Link from 'next/link';
// import Image from 'next/image';
// import { Star, ShoppingCart } from 'lucide-react';

// const BookCard = ({ book }) => {
//   const { id, title, author, price, originalPrice, rating, reviewCount, image } = book;

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative">
//             <Star className="h-3 w-3 text-gray-300 fill-current" />
//             <div className="absolute top-0 left-0 overflow-hidden w-1/2">
//               <Star className="h-3 w-3 text-yellow-400 fill-current" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-3 w-3 text-gray-300 fill-current" />);
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex-shrink-0 w-48 group">
//       <div className="relative">
//         <Link href={`/books/${id}`}>
//           <div className="aspect-[3/4] relative overflow-hidden cursor-pointer">
//             <Image
//               src={image || 'https://placehold.co/240x320'}
//               alt={title}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         </Link>
//       </div>

//       <div className="p-3">
//         <Link href={`/books/${id}`}>
//           <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 hover:text-purple-600 transition-colors cursor-pointer leading-tight">
//             {title}
//           </h3>
//         </Link>

//         <p className="text-gray-600 text-xs mb-2">{author}</p>

//         <div className="flex items-center space-x-1 mb-2">
//           <div className="flex items-center">
//             {renderStars(rating)}
//           </div>
//           <span className="text-xs text-gray-500">({reviewCount})</span>
//         </div>

//         <div className="flex items-center space-x-2 mb-3">
//           <span className="text-lg font-bold text-gray-900">Ksh.{price}</span>
//           {originalPrice && originalPrice > price && (
//             <span className="text-sm text-gray-500 line-through">Ksh.{originalPrice}</span>
//           )}
//         </div>

//         <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
//           <ShoppingCart className="h-4 w-4" />
//           <span>Add to Cart</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookCard;

"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BookCard = ({ book }) => {
  const { id, title, author, price, originalPrice, rating, reviewCount, image } = book;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-3 w-3 text-gray-300 fill-current" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300 fill-current" />);
      }
    }
    return stars;
  };

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex-shrink-0 w-48 group">
      <div className="relative">
        <Link href={`/books/${id}`}>
          <div className="aspect-[3/4] relative overflow-hidden cursor-pointer">
            <Image
              src={image || 'https://placehold.co/240x320'}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                -{discountPercentage}%
              </div>
            )}
          </div>
        </Link>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      <div className="p-3">
        <Link href={`/books/${id}`}>
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 hover:text-purple-600 transition-colors cursor-pointer leading-tight">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 text-xs mb-2">{author}</p>

        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">Ksh.{price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">Ksh.{originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
            isAdded 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookCard;