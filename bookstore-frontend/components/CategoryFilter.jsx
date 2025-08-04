import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-Fiction' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'romance', name: 'Romance' },
    { id: 'sci-fi', name: 'Science Fiction' },
  ];

  const currentCategory = categories.find(cat => cat.id === selectedCategory) || categories[0];

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
      >
        <span className="text-gray-700 font-medium">{currentCategory.name}</span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategoryChange?.(category.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors ${
                selectedCategory === category.id ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;