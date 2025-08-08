// import { useState } from 'react';
// import Link from 'next/link';
// import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link href="/" className="flex items-center">
//             <span className="text-2l font-bold text-gray-900">Books</span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Home
//             </Link>
//             <Link href="/books/all" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               All Books
//             </Link>
//             <Link href="/books/all?category=new-releases" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               New Releases
//             </Link>
//             <Link href="/books/all?category=bestsellers" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Bestsellers
//             </Link>
//           </div>

//           <div className="hidden md:flex flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search books, authors..."
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
//               <Heart className="h-6 w-6" />
//             </button>
//             <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
//               <ShoppingCart className="h-6 w-6" />
//               <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 3
//               </span>
//             </Link>
//             <Link href="/login" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
//               <User className="h-6 w-6" />
//             </Link>
//           </div>

//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         <div className="md:hidden pb-3">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search books, authors..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100">
//           <div className="px-4 py-3 space-y-3">
//             <Link href="/" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Home
//             </Link>
//             <Link href="/books/all" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               All Books
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// // export default Navbar;
// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
// import { useCart } from '../context/CartContext';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { getCartCount } = useCart();
//   const cartCount = getCartCount();

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link href="/" className="flex items-center">
//             <span className="text-2xl font-bold text-gray-900">Books</span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Home
//             </Link>
//             <Link href="/books/all" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               All Books
//             </Link>
//             <Link href="/books/all?category=new-releases" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               New Releases
//             </Link>
//             <Link href="/books/all?category=bestsellers" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Bestsellers
//             </Link>
//           </div>

//           <div className="hidden md:flex flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search books, authors..."
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
//               <Heart className="h-6 w-6" />
//             </button>
//             <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
//               <ShoppingCart className="h-6 w-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//             <Link href="/login" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
//               <User className="h-6 w-6" />
//             </Link>
//           </div>

//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         <div className="md:hidden pb-3">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search books, authors..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100">
//           <div className="px-4 py-3 space-y-3">
//             <Link href="/" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Home
//             </Link>
//             <Link href="/books/all" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               All Books
//             </Link>
//             <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               <ShoppingCart className="h-5 w-5 mr-2" />
//               Cart ({cartCount})
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// components/Navbar.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Safely use cart context
  const cart = useCart();
  const cartCount = cart ? cart.getCartCount() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">Books</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/books/all" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              All Books
            </Link>
            <Link href="/books/all?category=new-releases" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              New Releases
            </Link>
            <Link href="/books/all?category=bestsellers" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Bestsellers
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search books, authors..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <User className="h-6 w-6" />
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books, authors..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/books/all" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
              All Books
            </Link>
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart {mounted && cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;