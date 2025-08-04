import { Star } from 'lucide-react';

const RatingStars = ({ rating = 0, maxRating = 5, size = 'md' }) => {
  const sizeClasses = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className={`${sizeClasses[size]} text-yellow-400 fill-current`} />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className={`${sizeClasses[size]} text-gray-300 fill-current`} />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className={`${sizeClasses[size]} text-yellow-400 fill-current`} />
          </div>
        </div>
      );
    }

    const emptyStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`${sizeClasses[size]} text-gray-300 fill-current`} />);
    }

    return stars;
  };

  return (
    <div className="flex items-center space-x-0.5">
      {renderStars()}
    </div>
  );
};

export default RatingStars;