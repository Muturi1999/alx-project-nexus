export default function BookDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 bg-gray-200 rounded w-64 mb-6"></div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Book Cover skeleton */}
        <div className="relative">
          <div className="aspect-[2/3] w-full max-w-md mx-auto bg-gray-300 rounded-lg"></div>
        </div>

        {/* Book Information skeleton */}
        <div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>

          {/* Rating skeleton */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>

          {/* Price skeleton */}
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>

          {/* Add to Cart skeleton */}
          <div className="flex gap-4 mb-8">
            <div className="h-12 bg-gray-200 rounded w-32"></div>
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
          </div>

          {/* Quick Features skeleton */}
          <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div>
                  <div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Description skeleton */}
          <div className="mt-8">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Extended sections skeleton */}
      <div className="space-y-12">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}