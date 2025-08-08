// // cat > context/CartContext.jsx << 'EOF'
// // "use client";

// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     // Return default values during SSR
//     if (typeof window === 'undefined') {
//       return {
//         cartItems: [],
//         addToCart: () => {},
//         updateQuantity: () => {},
//         removeFromCart: () => {},
//         clearCart: () => {},
//         getCartTotal: () => 0,
//         getCartCount: () => 0
//       };
//     }
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [mounted, setMounted] = useState(false);

//   // Set mounted flag
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     if (mounted && typeof window !== 'undefined') {
//       const savedCart = localStorage.getItem('cart');
//       if (savedCart) {
//         try {
//           setCartItems(JSON.parse(savedCart));
//         } catch (error) {
//           console.error('Error loading cart from localStorage:', error);
//         }
//       }
//     }
//   }, [mounted]);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     if (mounted && typeof window !== 'undefined') {
//       localStorage.setItem('cart', JSON.stringify(cartItems));
//     }
//   }, [cartItems, mounted]);

//   const addToCart = (book, quantity = 1) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === book.id);
      
//       if (existingItem) {
//         // Update quantity if item already exists
//         return prevItems.map(item =>
//           item.id === book.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       } else {
//         // Add new item to cart
//         return [...prevItems, { ...book, quantity }];
//       }
//     });
//   };

//   const updateQuantity = (bookId, quantity) => {
//     if (quantity <= 0) {
//       removeFromCart(bookId);
//       return;
//     }
    
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === bookId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const removeFromCart = (bookId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const getCartCount = () => {
//     return cartItems.reduce((count, item) => count + item.quantity, 0);
//   };

//   const value = {
//     cartItems,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     getCartTotal,
//     getCartCount
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// context/CartContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  // Return null instead of throwing error during SSR
  if (!context) {
    return null;
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Set client flag after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (isClient) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, [isClient]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient && cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  const addToCart = (book, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...book, quantity }];
      }
    });
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setCartItems([]);
    if (isClient) {
      localStorage.removeItem('cart');
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    isClient
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};