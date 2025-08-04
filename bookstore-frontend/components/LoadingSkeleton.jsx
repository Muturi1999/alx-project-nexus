const LoadingSkeleton = ({ count = 5 }) => {
  const BookCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse flex-shrink-0 w-48">
      <div className="aspect-[3/4] bg-gray-300"></div>
      <div className="p-3 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-300 rounded"></div>
          ))}
        </div>
        <div className="h-5 bg-gray-300 rounded w-16"></div>
        <div className="h-8 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-16 animate-pulse"></div>
        </div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {[...Array(count)].map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;