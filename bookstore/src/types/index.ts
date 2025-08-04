export interface Book {
  id: string
  title: string
  author: string
  price: number
  image: string
  rating: number
  category: string
  description: string
  synopsis: string
  stock: number
  isbn: string
  pages: number
  publishedDate: string
  publisher: string
  reviews?: Review[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  description?: string
}

export interface CartItem extends Book {
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'customer'
  address?: Address
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
  address: Address
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  currentPage: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface FilterOptions {
  category?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  author?: string
  search?: string
}

export interface SortOptions {
  field: 'title' | 'author' | 'price' | 'rating' | 'publishedDate'
  direction: 'asc' | 'desc'
}
