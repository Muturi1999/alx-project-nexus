'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  🚀 ProDev Frontend Engineering Project
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your Life with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {' '}Powerful Books
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover life-changing books on personal development, financial literacy, 
                emotional intelligence, and spiritual growth. Your journey to success starts here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/books" className="btn-primary text-lg px-8 py-4 text-center">
                Explore Books
              </Link>
              <Link href="/books?category=Growth" className="btn-secondary text-lg px-8 py-4 text-center">
                Browse Categories
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Free Shipping on $50+</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>30-Day Returns</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Book Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Featured Book */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-auto"
              >
                <div className="relative mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
                    alt="Featured Book"
                    width={200}
                    height={280}
                    className="rounded-lg mx-auto shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Bestseller
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    The 7 Habits of Highly Effective People
                  </h3>
                  <p className="text-gray-600">Stephen R. Covey</p>
                  
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(4.8)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">$16.99</span>
                    <button className="btn-primary px-4 py-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Background Books */}
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 0.3, rotate: -10 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 w-32 h-40 z-0"
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg"></div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ opacity: 0.3, rotate: 10 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute top-8 right-4 bg-white rounded-xl shadow-lg p-4 w-32 h-40 z-0"
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}