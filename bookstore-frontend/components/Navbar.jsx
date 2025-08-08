// "use client";

// import { useEffect, useMemo, useRef, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { BOOKS } from '../data/books';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // Cart badge
//   const { totalCount = 0 } = useCart();
//   const cartCount = mounted ? totalCount : 0;

//   // --- Search state ---
//   const router = useRouter();
//   const [query, setQuery] = useState('');
//   const [open, setOpen] = useState(false);
//   const boxRef = useRef(null);

//   useEffect(() => setMounted(true), []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function onDocClick(e) {
//       if (!boxRef.current) return;
//       if (!boxRef.current.contains(e.target)) setOpen(false);
//     }
//     document.addEventListener('click', onDocClick);
//     return () => document.removeEventListener('click', onDocClick);
//   }, []);

//   // Filter books (title or author)
//   const results = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return [];
//     return BOOKS.filter(b =>
//       String(b.title).toLowerCase().includes(q) ||
//       String(b.author).toLowerCase().includes(q)
//     ).slice(0, 6); // cap results
//   }, [query]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (results.length > 0) {
//       router.push(`/books/${results[0].id}`);
//       setOpen(false);
//       setQuery('');
//     } else {
//       setOpen(true); // show "No books found"
//     }
//   };

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

//           {/* Desktop Search */}
//           <div className="hidden md:flex flex-1 max-w-md mx-8" ref={boxRef}>
//             <form className="relative w-full" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
//                 onFocus={() => setOpen(true)}
//                 placeholder="Search books, authors..."
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
//                 aria-label="Search books"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
//             </form>

//             {/* Results dropdown */}
//             {open && (
//               <div className="absolute mt-12 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//                 {query.trim() && results.length === 0 && (
//                   <div className="px-4 py-3 text-sm text-gray-600">No books found</div>
//                 )}
//                 {results.map((b) => {
//                   const safeImage =
//                     !b.image || (typeof b.image === 'string' && b.image.startsWith('/api/placeholder'))
//                       ? '/vercel.svg'
//                       : b.image;
//                   return (
//                     <Link
//                       key={b.id}
//                       href={`/books/${b.id}`}
//                       className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//                       onClick={() => { setOpen(false); setQuery(''); }}
//                     >
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img src={safeImage} alt={b.title} className="w-8 h-10 object-cover rounded" />
//                       <div className="min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate">{b.title}</p>
//                         <p className="text-xs text-gray-600 truncate">by {b.author}</p>
//                       </div>
//                     </Link>
//                   );
//                 })}
//                 {query.trim() && (
//                   <button
//                     className="w-full text-left px-4 py-2 text-xs text-gray-500 border-t hover:bg-gray-50"
//                     onClick={() => { setOpen(false); }}
//                   >
//                     Close
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Wishlist">
//               <Heart className="h-6 w-6" />
//             </button>
//             <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Cart">
//               <ShoppingCart className="h-6 w-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//             <Link href="/login" className="p-2 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Account">
//               <User className="h-6 w-6" />
//             </Link>
//           </div>

//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile search */}
//         <div className="md:hidden pb-3" ref={boxRef}>
//           <form className="relative" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
//               onFocus={() => setOpen(true)}
//               placeholder="Search books, authors..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               aria-label="Search books"
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
//           </form>

//           {open && (
//             <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//               {query.trim() && results.length === 0 && (
//                 <div className="px-4 py-3 text-sm text-gray-600">No books found</div>
//               )}
//               {results.map((b) => {
//                 const safeImage =
//                   !b.image || (typeof b.image === 'string' && b.image.startsWith('/api/placeholder'))
//                     ? '/vercel.svg'
//                     : b.image;
//                 return (
//                   <Link
//                     key={b.id}
//                     href={`/books/${b.id}`}
//                     className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//                     onClick={() => { setOpen(false); setQuery(''); setIsMobileMenuOpen(false); }}
//                   >
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img src={safeImage} alt={b.title} className="w-8 h-10 object-cover rounded" />
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-gray-900 truncate">{b.title}</p>
//                       <p className="text-xs text-gray-600 truncate">by {b.author}</p>
//                     </div>
//                   </Link>
//                 );
//               })}
//               {query.trim() && (
//                 <button
//                   className="w-full text-left px-4 py-2 text-xs text-gray-500 border-t hover:bg-gray-50"
//                   onClick={() => setOpen(false)}
//                 >
//                   Close
//                 </button>
//               )}
//             </div>
//           )}
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
//               Cart {cartCount > 0 && `(${cartCount})`}
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Settings, LogIn, UserPlus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BOOKS } from '../data/books';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cart badge
  const { totalCount = 0 } = useCart();
  const cartCount = mounted ? totalCount : 0;

  // Search state (kept from your working version)
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchBoxRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Click outside handlers
  useEffect(() => {
    function onDocClick(e) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) setOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return BOOKS.filter(b =>
      String(b.title).toLowerCase().includes(q) ||
      String(b.author).toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/books/${results[0].id}`);
      setOpen(false);
      setQuery('');
    } else {
      setOpen(true);
    }
  };

  const handleLogout = () => {
    try {
      // clear any fake auth you might set later
      localStorage.removeItem('auth');
    } catch {}
    setUserMenuOpen(false);
    router.push('/login');
  };

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

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchBoxRef}>
            <form className="relative w-full" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                placeholder="Search books, authors..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-colors"
                aria-label="Search books"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </form>

            {open && (
              <div className="absolute mt-12 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {query.trim() && results.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-600">No books found</div>
                )}
                {results.map((b) => {
                  const safeImage =
                    !b.image || (typeof b.image === 'string' && b.image.startsWith('/api/placeholder'))
                      ? '/vercel.svg'
                      : b.image;
                  return (
                    <Link
                      key={b.id}
                      href={`/books/${b.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => { setOpen(false); setQuery(''); }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={safeImage} alt={b.title} className="w-8 h-10 object-cover rounded" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{b.title}</p>
                        <p className="text-xs text-gray-600 truncate">by {b.author}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Wishlist">
              <Heart className="h-6 w-6" />
            </button>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md border border-transparent hover:border-gray-200"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                aria-label="User menu"
              >
                <User className="h-6 w-6" />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Cart">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3" ref={searchBoxRef}>
          <form className="relative" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              placeholder="Search books, authors..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              aria-label="Search books"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </form>

          {open && (
            <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-600">No books found</div>
              )}
              {results.map((b) => {
                const safeImage =
                  !b.image || (typeof b.image === 'string' && b.image.startsWith('/api/placeholder'))
                    ? '/vercel.svg'
                    : b.image;
                return (
                  <Link
                    key={b.id}
                    href={`/books/${b.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => { setOpen(false); setQuery(''); setIsMobileMenuOpen(false); }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={safeImage} alt={b.title} className="w-8 h-10 object-cover rounded" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{b.title}</p>
                      <p className="text-xs text-gray-600 truncate">by {b.author}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/books/all" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
              All Books
            </Link>
            <Link href="/login" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Login
            </Link>
            <Link href="/register" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Register
            </Link>
            <Link href="/settings" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-600 hover:text-red-700 transition-colors font-medium"
            >
              Logout
            </button>
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
