export default function LoadingCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-64 bg-gray-300 rounded-t-xl"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  )
}