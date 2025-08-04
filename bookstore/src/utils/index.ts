// // src/utils/index.ts - Simplified version without clsx/tailwind-merge
// // Format currency
// export const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(amount)
// }

// // Format date
// export const formatDate = (date: string | Date): string => {
//   return new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   }).format(new Date(date))
// }

// // Truncate text
// export const truncateText = (text: string, maxLength: number): string => {
//   if (text.length <= maxLength) return text
//   return text.slice(0, maxLength) + '...'
// }

// // Generate star rating array
// export const generateStarRating = (rating: number): boolean[] => {
//   return Array.from({ length: 5 }, (_, index) => index < Math.floor(rating))
// }

// // Debounce function
// export const debounce = <T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): ((...args: Parameters<T>) => void) => {
//   let timeout: NodeJS.Timeout
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => func(...args), wait)
//   }
// }

// // Throttle function
// export const throttle = <T extends (...args: any[]) => any>(
//   func: T,
//   limit: number
// ): ((...args: Parameters<T>) => void) => {
//   let inThrottle: boolean
//   return (...args: Parameters<T>) => {
//     if (!inThrottle) {
//       func(...args)
//       inThrottle = true
//       setTimeout(() => (inThrottle = false), limit)
//     }
//   }
// }

// // Simple className utility (replaces cn function)
// export const classNames = (...classes: (string | undefined | null | false)[]): string => {
//   return classes.filter(Boolean).join(' ')
// }

// // Local storage helpers
// export const storage = {
//   get: <T>(key: string): T | null => {
//     if (typeof window === 'undefined') return null
//     try {
//       const item = localStorage.getItem(key)
//       return item ? JSON.parse(item) : null
//     } catch {
//       return null
//     }
//   },
  
//   set: <T>(key: string, value: T): void => {
//     if (typeof window === 'undefined') return
//     try {
//       localStorage.setItem(key, JSON.stringify(value))
//     } catch (error) {
//       console.error('Error saving to localStorage:', error)
//     }
//   },
  
//   remove: (key: string): void => {
//     if (typeof window === 'undefined') return
//     try {
//       localStorage.removeItem(key)
//     } catch (error) {
//       console.error('Error removing from localStorage:', error)
//     }
//   },
  
//   clear: (): void => {
//     if (typeof window === 'undefined') return
//     try {
//       localStorage.clear()
//     } catch (error) {
//       console.error('Error clearing localStorage:', error)
//     }
//   },
// }

// // Validation helpers
// export const validation = {
//   email: (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     return emailRegex.test(email)
//   },
  
//   password: (password: string): { valid: boolean; message: string } => {
//     if (password.length < 8) {
//       return { valid: false, message: 'Password must be at least 8 characters long' }
//     }
//     if (!/(?=.*[a-z])/.test(password)) {
//       return { valid: false, message: 'Password must contain at least one lowercase letter' }
//     }
//     if (!/(?=.*[A-Z])/.test(password)) {
//       return { valid: false, message: 'Password must contain at least one uppercase letter' }
//     }
//     if (!/(?=.*\d)/.test(password)) {
//       return { valid: false, message: 'Password must contain at least one number' }
//     }
//     return { valid: true, message: 'Password is valid' }
//   },
  
//   required: (value: string): boolean => {
//     return value.trim().length > 0
//   },
// }

// // Error handling
// export const handleApiError = (error: any): string => {
//   if (error.response?.data?.message) {
//     return error.response.data.message
//   }
//   if (error.message) {
//     return error.message
//   }
//   return 'An unexpected error occurred'
// }

// // URL helpers
// export const createQueryString = (params: Record<string, string | number | undefined>): string => {
//   const searchParams = new URLSearchParams()
  
//   Object.entries(params).forEach(([key, value]) => {
//     if (value !== undefined && value !== '') {
//       searchParams.set(key, value.toString())
//     }
//   })
  
//   return searchParams.toString()
// }

// // Image helpers
// export const getImageUrl = (path: string): string => {
//   if (path.startsWith('http')) return path
//   return `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/${path}`
// }

// // Book helpers
// export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
//   return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
// }

// export const getStockStatus = (stock: number): { status: string; color: string } => {
//   if (stock > 10) return { status: 'In Stock', color: 'text-green-600' }
//   if (stock > 0) return { status: 'Low Stock', color: 'text-yellow-600' }
//   return { status: 'Out of Stock', color: 'text-red-600' }
// }


export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Format date
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Generate star rating array
export const generateStarRating = (rating: number): boolean[] => {
  return Array.from({ length: 5 }, (_, index) => index < Math.floor(rating))
}

// Debounce function with proper typing
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function with proper typing
export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Simple className utility
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

// Local storage helpers with proper error typing
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}

// Validation helpers
export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  
  password: (password: string): { valid: boolean; message: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' }
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' }
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' }
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' }
    }
    return { valid: true, message: 'Password is valid' }
  },
  
  required: (value: string): boolean => {
    return value.trim().length > 0
  },
}

// Define proper error types
interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

// Error handling with proper typing
export const handleApiError = (error: ApiError | Error | unknown): string => {
  if (error && typeof error === 'object') {
    // Handle axios-style errors
    if ('response' in error && error.response?.data?.message) {
      return error.response.data.message
    }
    // Handle standard Error objects
    if ('message' in error && typeof error.message === 'string') {
      return error.message
    }
  }
  return 'An unexpected error occurred'
}

// URL helpers
export const createQueryString = (params: Record<string, string | number | undefined>): string => {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, value.toString())
    }
  })
  
  return searchParams.toString()
}

// Image helpers
export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) return path
  return `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/media/${path}`
}

// Book helpers
export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export const getStockStatus = (stock: number): { status: string; color: string } => {
  if (stock > 10) return { status: 'In Stock', color: 'text-green-600' }
  if (stock > 0) return { status: 'Low Stock', color: 'text-yellow-600' }
  return { status: 'Out of Stock', color: 'text-red-600' }
}

// Helper for conditional class names (replaces clsx functionality)
export const cx = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes
    .filter((cls): cls is string => typeof cls === 'string' && cls.length > 0)
    .join(' ')
}