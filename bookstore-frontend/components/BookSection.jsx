import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import BookCard from './BookCard';

const BookSection = ({ title, books, viewAllLink }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {viewAllLink && (
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              View All
            </button>
          )}
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:shadow-lg transition-shadow"
            style={{ marginLeft: '-20px' }}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:shadow-lg transition-shadow"
            style={{ marginRight: '-20px' }}
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;