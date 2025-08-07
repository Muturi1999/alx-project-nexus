import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../layouts/Layout';
import Link from 'next/link';

const mockBooks = [
  {
    id: 1,
    title: 'The Lost Something: A Story About Letting Go',
    author: 'Justin Bieber',
    price: 1500.0,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 234,
    image: 'https://placehold.co/400x600',
    description: 'A compelling story about finding peace after loss.',
    category: 'Fiction',
    pages: 240,
    inStock: true,
    tags: ['Fiction', 'Letting Go', 'Life'],
  },
  {
    id: 2,
    title: 'Goal of Life',
    author: 'Debby Muturi',
    price: 1200.0,
    originalPrice: 1699,
    rating: 4.6,
    reviewCount: 156,
    image: 'https://placehold.co/400x600',
    description: 'Discover your life purpose with practical wisdom.',
    category: 'Self Help',
    pages: 200,
    inStock: true,
    tags: ['Self Help', 'Motivation', 'Purpose'],
  },
  // ... add other books as needed
];

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;

  const book = mockBooks.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <Layout>
        <div className="p-10 text-center text-gray-600">
          <h1 className="text-2xl font-semibold">Book not found</h1>
          <Link href="/books/all" className="text-purple-600 underline mt-4 block">
            Return to all books
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <div>
          <Image
            src={book.image}
            width={400}
            height={600}
            alt={book.title}
            className="rounded shadow"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 text-lg mb-4">by {book.author}</p>

          <div className="text-purple-600 text-2xl font-semibold mb-2">
            Ksh {book.price.toFixed(2)}
            {book.originalPrice && (
              <span className="text-gray-500 line-through text-lg ml-3">
                Ksh {book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500">Rating: {book.rating} ★</span>
            <span className="ml-2 text-gray-500">({book.reviewCount} reviews)</span>
          </div>

          <p className="mb-4 text-gray-700">{book.description}</p>

          <p className="mb-2 text-sm text-gray-600">Category: {book.category}</p>
          <p className="mb-2 text-sm text-gray-600">Pages: {book.pages}</p>

          <div className="flex gap-2 mt-4 flex-wrap">
            {book.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          <button className="mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}
