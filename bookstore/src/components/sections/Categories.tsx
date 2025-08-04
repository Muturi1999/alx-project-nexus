'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CATEGORIES } from '@/constants'

const categoryIcons = {
  'Growth': '',
  'Financial': '',
  'Emotional Intelligence': '',
  'Spiritual': '',
  'Investment': '',
  'Fiction': '',
  'Fantasy': '',
  'Romance': '',
  'Mystery': '',
  'Sci-Fi': '',
  'Biography': '',
}

const categoryColors = {
  'Growth': 'from-green-400 to-green-600',
  'Financial': 'from-yellow-400 to-yellow-600',
  'Emotional Intelligence': 'from-purple-400 to-purple-600',
  'Spiritual': 'from-blue-400 to-blue-600',
  'Investment': 'from-red-400 to-red-600',
  'Fiction': 'from-indigo-400 to-indigo-600',
  'Fantasy': 'from-pink-400 to-pink-600',
  'Romance': 'from-rose-400 to-rose-600',
  'Mystery': 'from-gray-400 to-gray-600',
  'Sci-Fi': 'from-cyan-400 to-cyan-600',
  'Biography': 'from-orange-400 to-orange-600',
}

export default function Categories() {
  const displayCategories = CATEGORIES.filter(cat => cat !== 'All')

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find books that align with your interests and goals
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/books?category=${encodeURIComponent(category)}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-6 text-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-400 to-gray-600'} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">
                      {categoryIcons[category as keyof typeof categoryIcons] || '📖'}
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/books" className="btn-primary text-lg px-8 py-3">
            View All Books
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
