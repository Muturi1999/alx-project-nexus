import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Books</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your destination for discovering amazing books. From bestsellers to hidden gems.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/books/all" className="text-gray-300 hover:text-white transition-colors text-sm">All Books</Link></li>
              <li><Link href="/books/all?category=new-releases" className="text-gray-300 hover:text-white transition-colors text-sm">New Releases</Link></li>
              <li><Link href="/books/all?category=bestsellers" className="text-gray-300 hover:text-white transition-colors text-sm">Bestsellers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: mike@books.com</p>
              <p>Phone: +254728160293</p>
              <p>Address: 10763-00200, City Square Nairobi</p>
            </div>
          </div>

          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">We Accept</h3>
            <div className="flex space-x-2">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">MC</div>
              <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">AMEX</div>
            </div>
          </div> */}
          <div className="space-y-4">
  <h3 className="text-lg font-semibold">We Accept</h3>
  <div className="flex space-x-2">
    <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">Mastercard</div>
    <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">M-Pesa</div>
  </div>
</div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">© 2025 Books. All rights reserved.</div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;