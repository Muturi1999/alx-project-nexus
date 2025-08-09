import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Footer from '../components/Footer';

// Import Navbar dynamically to avoid SSR issues
const Navbar = dynamic(() => import('../components/Navbar'), {
  ssr: false,
  loading: () => (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center">
          <span className="text-2xl font-bold text-gray-900">Books</span>
        </div>
      </div>
    </nav>
  )
});

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;