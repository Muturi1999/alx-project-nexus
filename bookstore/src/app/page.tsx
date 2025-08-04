// // 'use client'
// // import { useEffect } from 'react'
// // import { useAppDispatch, useAppSelector } from '@/store'
// // import { fetchFeaturedBooks, fetchBestSellers, fetchBooks } from '@/store/slices/booksSlice'
// // import Header from '@/components/layout/Header'
// // import Footer from '@/components/layout/Footer'
// // import Hero from '@/components/sections/Hero'
// // import FeaturedBooks from '@/components/sections/FeaturedBooks'
// // import BestSellers from '@/components/sections/BestSellers'
// // import Categories from '@/components/sections/Categories'
// // import Newsletter from '@/components/sections/Newsletter'
// // import LoadingSpinner from '@/components/ui/LoadingSpinner'

// // export default function HomePage() {
// //   const dispatch = useAppDispatch()
// //   const { featuredBooks, bestSellers, loading } = useAppSelector((state) => state.books)

// //   useEffect(() => {
// //     dispatch(fetchFeaturedBooks())
// //     dispatch(fetchBestSellers())
// //   }, [dispatch])

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />
      
// //       <main>
// //         <Hero />
        
// //         {loading ? (
// //           <div className="flex justify-center items-center py-20">
// //             <LoadingSpinner size="lg" />
// //           </div>
// //         ) : (
// //           <>
// //             <FeaturedBooks books={featuredBooks} />
// //             <BestSellers books={bestSellers} />
// //             <Categories />
// //             <Newsletter />
// //           </>
// //         )}
// //       </main>
      
// //       <Footer />
// //     </div>
// //   )
// // }

// 'use client'
// import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '@/store'
// import { fetchFeaturedBooks, fetchBestSellers } from '@/store/slices/booksSlice'
// import Header from '@/components/layout/Header'
// import Footer from '@/components/layout/Footer'
// import Hero from '@/components/sections/Hero'
// import FeaturedBooks from '@/components/sections/FeaturedBooks'
// import BestSellers from '@/components/sections/BestSellers'
// import Categories from '@/components/sections/Categories'
// import Newsletter from '@/components/sections/Newsletter'
// import LoadingSpinner from '@/components/ui/LoadingSpinner'
// import Sidebar from '@/components/layout/Sidebar'
// import CartSlideOver from '@/components/product/CartSlideOver'

// export default function HomePage() {
//   const dispatch = useAppDispatch()
//   const { featuredBooks, bestSellers, loading } = useAppSelector((state) => state.books)

//   useEffect(() => {
//     dispatch(fetchFeaturedBooks())
//     dispatch(fetchBestSellers())
//   }, [dispatch])

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <Sidebar />
//       <CartSlideOver />
      
//       <main>
//         <Hero />
        
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <LoadingSpinner size="lg" />
//           </div>
//         ) : (
//           <>
//             <FeaturedBooks books={featuredBooks} />
//             <BestSellers books={bestSellers} />
//             <Categories />
//             <Newsletter />
//           </>
//         )}
//       </main>
      
//       <Footer />
//     </div>
//   )
// }
// Create a simple test version of src/app/page.tsx
'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchFeaturedBooks, fetchBestSellers } from '@/store/slices/booksSlice'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Simple Hero Section (no external images)
function SimpleHero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
            🚀 ProDev Frontend Engineering Project
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Transform Your Life with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Powerful Books
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover life-changing books on personal development, financial literacy, 
            emotional intelligence, and spiritual growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Explore Books
            </button>
            <button className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Simple Featured Books (no images)
function SimpleFeaturedBooks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Books
          </h2>
          <p className="text-xl text-gray-600">
            Handpicked selections to help you grow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-bold">Book {i}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sample Book Title {i}</h3>
              <p className="text-gray-600 text-sm mb-4">by Author Name</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">$15.99</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Simple Categories
function SimpleCategories() {
  const categories = ['Growth', 'Financial', 'Emotional Intelligence', 'Spiritual', 'Investment']
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-xl text-gray-600">
            Find books that align with your goals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main Homepage Component
export default function HomePage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Try to fetch data, but don't break if it fails
    try {
      dispatch(fetchFeaturedBooks())
      dispatch(fetchBestSellers())
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <SimpleHero />
        <SimpleFeaturedBooks />
        <SimpleCategories />
        
        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Stay Updated with New Releases
              </h2>
              <p className="text-lg text-blue-100">
                Get notified about new books and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}