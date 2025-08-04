'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@/store'
import { addToCart } from '@/store/slices/cartSlice'
import { addNotification } from '@/store/slices/uiSlice'
import { StarIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { formatCurrency, generateStarRating } from '@/utils'
import type { Book } from '@/types'

interface BookCardProps {
  book: Book
  featured?: boolean
}

export default function BookCard({ book, featured = false }: BookCardProps) {
  const dispatch = useAppDispatch()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    dispatch(addToCart(book))
    dispatch(addNotification({
      type: 'success',
      message: `${book.title} added to cart!`
    }))
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsWishlisted(!isWishlisted)
    dispatch(addNotification({
      type: isWishlisted ? 'info' : 'success',
      message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!'
    }))
  }

  const stars = generateStarRating(book.rating)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/books/${book.id}`}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer h-full">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            {featured && (
              <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Bestseller
              </div>
            )}
            
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              {isWishlisted ? (
                <HeartIconSolid className="w-4 h-4 text-red-500" />
              ) : (
                <HeartIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
              )}
            </button>

            <div className="relative h-64 bg-gray-200">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" />
                </div>
              )}
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setImageLoading(false)}
              />
            </div>

            {/* Rating Badge */}
            <div className="absolute bottom-3 left-3 bg-white rounded-full px-2 py-1 shadow-sm">
              <div className="flex items-center space-x-1">
                <StarIconSolid className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">{book.rating}</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Category */}
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
              {book.category}
            </span>
            
            {/* Title & Author */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm">by {book.author}</p>
            </div>
            
            {/* Star Rating */}
            <div className="flex items-center space-x-1">
              {stars.map((filled, index) => (
                filled ? (
                  <StarIconSolid key={index} className="w-4 h-4 text-yellow-400" />
                ) : (
                  <StarIcon key={index} className="w-4 h-4 text-gray-300" />
                )
              ))}
              <span className="text-sm text-gray-500 ml-2">({book.rating})</span>
            </div>
            
            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(book.price)}
                </span>
                <div className={`text-xs ${
                  book.stock > 10 ? 'text-green-600' : 
                  book.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {book.stock > 10 ? 'In Stock' : 
                   book.stock > 0 ? `Only ${book.stock} left` : 'Out of Stock'}
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
