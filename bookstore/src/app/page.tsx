// 'use client'
// import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '@/store'
// import { fetchFeaturedBooks, fetchBestSellers, fetchBooks } from '@/store/slices/booksSlice'
// import Header from '@/components/layout/Header'
// import Footer from '@/components/layout/Footer'
// import Hero from '@/components/sections/Hero'
// import FeaturedBooks from '@/components/sections/FeaturedBooks'
// import BestSellers from '@/components/sections/BestSellers'
// import Categories from '@/components/sections/Categories'
// import Newsletter from '@/components/sections/Newsletter'
// import LoadingSpinner from '@/components/ui/LoadingSpinner'

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

'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchFeaturedBooks, fetchBestSellers } from '@/store/slices/booksSlice'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'
import CartSlideOver from '@/components/product/CartSlideOver'
import Hero from '@/components/sections/Hero'
import FeaturedBooks from '@/components/sections/FeaturedBooks'
import BestSellers from '@/components/sections/BestSellers'
import Categories from '@/components/sections/Categories'
import Newsletter from '@/components/sections/Newsletter'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { featuredBooks, bestSellers, loading } = useAppSelector((state) => state.books)

  useEffect(() => {
    dispatch(fetchFeaturedBooks())
    dispatch(fetchBestSellers())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <CartSlideOver />
      
      <main>
        <Hero />
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <FeaturedBooks books={featuredBooks} />
            <BestSellers books={bestSellers} />
            <Categories />
            <Newsletter />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
