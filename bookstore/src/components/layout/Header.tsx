'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store'
import { setSearchQuery, toggleSidebar } from '@/store/slices/uiSlice'
import { toggleCart } from '@/store/slices/cartSlice'
import { logoutUser } from '@/store/slices/authSlice'
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { useDebounce } from '@/hooks/useDebounce'
import React from 'react'

export default function Header() {
  const dispatch = useAppDispatch()
  const { searchQuery, sidebarOpen } = useAppSelector((state) => state.ui)
  const { itemCount, total } = useAppSelector((state) => state.cart)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300)

  // Update global search query when debounced value changes
  React.useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery))
  }, [debouncedSearchQuery, dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            
            <Link href="/" className="flex items-center space-x-2 ml-2 md:ml-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                ProDev Books
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books, authors..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="input pl-10"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/books"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Books
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Categories
              </Link>
              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              {isAuthenticated && (
                <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                  <HeartIcon className="h-6 w-6" />
                </button>
              )}

              {/* Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 hidden sm:block">
                      Hello, {user?.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm font-medium hidden sm:block">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books, authors..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="input pl-10"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}