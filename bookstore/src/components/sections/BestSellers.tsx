'use client'
import { motion } from 'framer-motion'
import BookCard from '@/components/product/BookCard'
import type { Book } from '@/types'

interface BestSellersProps {
  books: Book[]
}

export default function BestSellers({ books }: BestSellersProps) {
  if (books.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The most popular books that have transformed countless lives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BookCard book={book} featured />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}