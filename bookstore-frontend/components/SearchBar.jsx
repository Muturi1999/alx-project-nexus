import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = "Search books..." }) => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default SearchBar;