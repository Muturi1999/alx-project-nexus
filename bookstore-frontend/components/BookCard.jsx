import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';

const BookCard = ({ book }) => {
  const { id, title, author, price, originalPrice, rating, reviewCount, image } = book;

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

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex-shrink-0 w-48 group">
      <div className="relative">
        <Link href={`/books/${id}`}>
          <div className="aspect-[3/4] relative overflow-hidden cursor-pointer">
            <Image
              src={image || '/api/placeholder/240/320'}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
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
          <span className="text-lg font-bold text-gray-900">Ksh.{price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">Ksh.{originalPrice}</span>
          )}
        </div>

        <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;