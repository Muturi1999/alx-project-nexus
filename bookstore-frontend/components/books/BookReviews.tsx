'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ChevronDown } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

interface BookReviewsProps {
  bookId: string;
}

// Mock data - replace with API call
const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Sarah M.',
    rating: 5,
    date: '2024-01-15',
    title: 'A timeless masterpiece',
    content: 'The Great Gatsby remains one of the most important works of American literature. Fitzgerald\'s prose is absolutely beautiful, and the themes of wealth, love, and the American Dream are as relevant today as they were in the 1920s. This edition is well-made with good print quality.',
    helpful: 47,
    verified: true
  },
  {
    id: '2',
    userName: 'Michael R.',
    rating: 4,
    date: '2024-02-03',
    title: 'Beautiful writing, tragic story',
    content: 'Fitzgerald has a way with words that few authors can match. The descriptions of the parties and the Jazz Age atmosphere are vivid and immersive. While the story itself is quite sad, it\'s a powerful commentary on wealth and obsession. Definitely worth reading.',
    helpful: 32,
    verified: true
  },
  {
    id: '3',
    userName: 'Emma L.',
    rating: 5,
    date: '2024-01-28',
    title: 'Required reading for everyone',
    content: 'I first read this in high school and didn\'t appreciate it. Reading it again as an adult, I\'m blown away by the layers of meaning and the beautiful symbolism throughout. The green light, the eyes of Doctor T.J. Eckleburg - everything has significance. Truly a masterpiece.',
    helpful: 28,
    verified: false
  }
];

export default function BookReviews({ bookId }: BookReviewsProps) {
  const [reviews] = useState<Review[]>(mockReviews);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState<'helpful' | 'recent'>('helpful');

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const ratingDistribution = {
    5: 65,
    4: 20,
    3: 10,
    2: 3,
    1: 2
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold">4.5</span>
            <span className="text-gray-600">out of 5</span>
          </div>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">2,847 global ratings</p>
        </div>

        {/* Rating Distribution */}
        <div className="md:col-span-2">
          {Object.entries(ratingDistribution).reverse().map(([stars, percentage]) => (
            <div key={stars} className="flex items-center gap-3 mb-2">
              <span className="text-sm w-12">{stars} star</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Reviews</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'helpful' | 'recent')}
          className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="helpful">Most Helpful</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start gap-4 mb-2">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                {review.userName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.userName}</span>
                  {review.verified && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-gray-700 leading-relaxed mb-3">{review.content}</p>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 3 && !showAllReviews && (
        <button
          onClick={() => setShowAllReviews(true)}
          className="mt-6 w-full py-3 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          Show all reviews
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}