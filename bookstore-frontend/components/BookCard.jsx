"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import BookCover from './BookCover';

const BookCard = ({ book }) => {
  const { id, title, author, price, originalPrice, rating, reviewCount, image } = book;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const cart = useCart();

  // Use real image only if it’s not the old placeholder
  const hasRealImage =
    image && typeof image === 'string' && !image.startsWith('/api/placeholder');

  const renderStars = (ratingVal) => {
    const full = Math.floor(ratingVal || 0);
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < full ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const discountPercentage =
    originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    const item = { id, title, price, image: hasRealImage ? image : null, author };
    cart.addToCart(item, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex-shrink-0 w-48 group">
      <div className="relative">
        <Link href={`/books/${id}`}>
          <div className="aspect-[3/4] relative overflow-hidden cursor-pointer">
            {hasRealImage ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="192px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <BookCover
                title={title}
                author={author}
                seed={id}
                // match the container size (w-48 => ~192px wide, 3/4 ratio)
                width={192}
                height={256}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            )}
            {discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                -{discountPercentage}%
              </div>
            )}
          </div>
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite((v) => !v);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
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
          <div className="flex items-center">{renderStars(rating)}</div>
          <span className="text-xs text-gray-500">({reviewCount || 0})</span>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">Ksh.{Number(price).toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              Ksh.{Number(originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
            isAdded ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-900 text-white hover:bg-gray-800'
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
