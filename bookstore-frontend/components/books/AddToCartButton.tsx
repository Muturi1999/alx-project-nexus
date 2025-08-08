// 'use client';

// import { useState } from 'react';
// import { ShoppingCart, Check } from 'lucide-react';

// interface Book {
//   id: string;
//   title: string;
//   author: string;
//   price: number;
//   coverImage: string;
// }

// interface AddToCartButtonProps {
//   book: Book;
// }

// export default function AddToCartButton({ book }: AddToCartButtonProps) {
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAdded, setIsAdded] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = async () => {
//     setIsAdding(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     // Here you would typically:
//     // 1. Call your cart API
//     // 2. Update global cart state
//     // 3. Show success notification
    
//     console.log('Adding to cart:', { book, quantity });
    
//     setIsAdding(false);
//     setIsAdded(true);
    
//     // Reset the "added" state after 2 seconds
//     setTimeout(() => setIsAdded(false), 2000);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-4">
//       {/* Quantity Selector */}
//       <div className="flex items-center border rounded-lg">
//         <button
//           onClick={() => setQuantity(Math.max(1, quantity - 1))}
//           className="px-4 py-3 hover:bg-gray-100 transition-colors"
//           disabled={quantity <= 1}
//         >
//           -
//         </button>
//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//           className="w-16 text-center border-x py-3 focus:outline-none"
//           min="1"
//         />
//         <button
//           onClick={() => setQuantity(quantity + 1)}
//           className="px-4 py-3 hover:bg-gray-100 transition-colors"
//         >
//           +
//         </button>
//       </div>

//       {/* Add to Cart Button */}
//       <button
//         onClick={handleAddToCart}
//         disabled={isAdding || isAdded}
//         className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
//           isAdded
//             ? 'bg-green-500 text-white'
//             : 'bg-blue-600 hover:bg-blue-700 text-white'
//         } ${isAdding ? 'opacity-75 cursor-not-allowed' : ''}`}
//       >
//         {isAdded ? (
//           <>
//             <Check className="w-5 h-5" />
//             Added to Cart
//           </>
//         ) : (
//           <>
//             <ShoppingCart className="w-5 h-5" />
//             {isAdding ? 'Adding...' : 'Add to Cart'}
//           </>
//         )}
//       </button>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface Book {
  id: number | string;
  title: string;
  author?: string;
  price: number;
  coverImage?: string;
  image?: string;
}

interface AddToCartButtonProps {
  book: Book;
}

export default function AddToCartButton({ book }: AddToCartButtonProps) {
  const cart = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    setIsAdding(true);

    const item = {
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.coverImage || book.image,
    };

    cart.addToCart(item, quantity);

    setIsAdding(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center border rounded-lg">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 hover:bg-gray-100 transition-colors"
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 text-center border-x py-3 focus:outline-none"
          min={1}
        />
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-3 hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || isAdded}
        className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
          isAdded ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
        } ${isAdding ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </>
        )}
      </button>
    </div>
  );
}
