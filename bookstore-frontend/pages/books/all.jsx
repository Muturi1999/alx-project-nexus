// import { useRouter } from 'next/router';
// import Layout from '../../layouts/Layout';
// import BookSection from '../../components/BookSection';

// const mockBooks = [/* same array from index.jsx */];

// const AllBooksPage = () => {
//   const router = useRouter();
//   const { category } = router.query;

//   const getFilteredBooks = () => {
//     switch (category) {
//       case 'new-releases':
//         return mockBooks.slice(0, 6);
//       case 'bestsellers':
//         return mockBooks.slice(3, 8);
//       default:
//         return mockBooks;
//     }
//   };

//   const pageTitle = category
//     ? category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
//     : 'All Books';

//   return (
//     <Layout>
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
//         <BookSection books={getFilteredBooks()} title={pageTitle} />
//       </div>
//     </Layout>
//   );
// };

// export default AllBooksPage;
// pages/books/all.jsx
// pages/books/all.jsx
// import { useRouter } from 'next/router';
// import Layout from '../../layouts/Layout';

// export default function AllBooksPage() {
//   const router = useRouter();
//   const { category } = router.query;

//   return (
//     <Layout>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">All Books</h1>

//         <div className="flex space-x-4 mb-6 border-b border-gray-200">
//           <button
//             onClick={() => router.push('/books/all')}
//             className={`pb-2 ${
//               !category ? 'border-b-2 border-purple-500 text-purple-600' : ''
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => router.push('/books/all?category=new-releases')}
//             className={`pb-2 ${
//               category === 'new-releases' ? 'border-b-2 border-purple-500 text-purple-600' : ''
//             }`}
//           >
//             New Releases
//           </button>
//           <button
//             onClick={() => router.push('/books/all?category=bestsellers')}
//             className={`pb-2 ${
//               category === 'bestsellers' ? 'border-b-2 border-purple-500 text-purple-600' : ''
//             }`}
//           >
//             Bestsellers
//           </button>
//         </div>

//         <div className="text-gray-700">
//           <p>
//             Showing books for: <strong>{category || 'All'}</strong>
//           </p>
//           {/* Display books based on the category */}
//           {/* You can later add actual book cards here based on filtering */}
//         </div>
//       </div>
//     </Layout>
//   );
// }
