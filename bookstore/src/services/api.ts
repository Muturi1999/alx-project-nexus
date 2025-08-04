import axios from 'axios'
import { API_BASE_URL } from '@/constants'
import type { 
  Book, 
  Category, 
  User, 
  Order, 
  ApiResponse, 
  PaginatedResponse,
  FilterOptions,
  SortOptions 
} from '@/types'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Books API
export const booksApi = {
  getBooks: async (
    page: number = 1, 
    filters?: FilterOptions, 
    sort?: SortOptions
  ): Promise<PaginatedResponse<Book>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: '12',
      ...(filters?.category && { category: filters.category }),
      ...(filters?.minPrice && { min_price: filters.minPrice.toString() }),
      ...(filters?.maxPrice && { max_price: filters.maxPrice.toString() }),
      ...(filters?.rating && { rating: filters.rating.toString() }),
      ...(filters?.author && { author: filters.author }),
      ...(filters?.search && { search: filters.search }),
      ...(sort?.field && { sort_by: sort.field }),
      ...(sort?.direction && { sort_order: sort.direction }),
    })
    
    const response = await api.get(`/books/?${params}`)
    return response.data
  },

  getBook: async (id: string): Promise<Book> => {
    const response = await api.get(`/books/${id}/`)
    return response.data
  },

  createBook: async (bookData: Omit<Book, 'id'>): Promise<Book> => {
    const response = await api.post('/books/', bookData)
    return response.data
  },

  updateBook: async (id: string, bookData: Partial<Book>): Promise<Book> => {
    const response = await api.patch(`/books/${id}/`, bookData)
    return response.data
  },

  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}/`)
  },

  getFeaturedBooks: async (): Promise<Book[]> => {
    const response = await api.get('/books/featured/')
    return response.data
  },

  getBestSellers: async (): Promise<Book[]> => {
    const response = await api.get('/books/bestsellers/')
    return response.data
  },
}

// Categories API
export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories/')
    return response.data
  },

  createCategory: async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
    const response = await api.post('/categories/', categoryData)
    return response.data
  },
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login/', { email, password })
    return response.data
  },

  register: async (userData: {
    email: string
    password: string
    name: string
    // address?: any
    address?: unknown

  }): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register/', userData)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout/')
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me/')
    return response.data
  },
}

// Orders API
export const ordersApi = {
  createOrder: async (orderData: {
    items: { book_id: string; quantity: number }[]
    // address: any
        address: unknown
  }): Promise<Order> => {
    const response = await api.post('/orders/', orderData)
    return response.data
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/')
    return response.data
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}/`)
    return response.data
  },
}

// Mock data for development (remove when backend is ready)
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    rating: 4.8,
    category: 'Growth',
    description: 'A powerful lesson in personal change',
    synopsis: 'Stephen Covey presents a holistic, integrated, principle-centered approach for solving personal and professional problems.',
    stock: 25,
    isbn: '978-1982137274',
    pages: 432,
    publishedDate: '2020-05-12',
    publisher: 'Simon & Schuster'
  },
  {
    id: '2',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
    rating: 4.6,
    category: 'Financial',
    description: 'What the Rich Teach Their Kids About Money',
    synopsis: 'Rich Dad Poor Dad is Robert\'s story of growing up with two dads and the ways in which both men shaped his thoughts about money.',
    stock: 30,
    isbn: '978-1612680194',
    pages: 336,
    publishedDate: '2017-04-11',
    publisher: 'Plata Publishing'
  },
  {
    id: '3',
    title: 'Emotional Intelligence 2.0',
    author: 'Travis Bradberry',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877cdf3f?w=300&h=400&fit=crop',
    rating: 4.4,
    category: 'Emotional Intelligence',
    description: 'Strategies for knowing and managing your emotions',
    synopsis: 'Emotional Intelligence 2.0 delivers a step-by-step program for increasing your emotional intelligence.',
    stock: 18,
    isbn: '978-0974320625',
    pages: 280,
    publishedDate: '2009-01-06',
    publisher: 'TalentSmart'
  },
  {
    id: '4',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    rating: 4.7,
    category: 'Spiritual',
    description: 'A Guide to Spiritual Enlightenment',
    synopsis: 'The Power of Now shows you that every minute you spend worrying about the future is a minute stolen from your present life.',
    stock: 22,
    isbn: '978-1577314806',
    pages: 236,
    publishedDate: '2004-10-06',
    publisher: 'New World Library'
  },
  {
    id: '5',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    rating: 4.9,
    category: 'Investment',
    description: 'The Definitive Book on Value Investing',
    synopsis: 'More than one million hardcovers sold. The Classic Text Annotated to Update Graham\'s Timeless Wisdom.',
    stock: 15,
    isbn: '978-0060555665',
    pages: 640,
    publishedDate: '2006-02-21',
    publisher: 'Harper Business'
  },
  {
    id: '6',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop',
    rating: 4.5,
    category: 'Growth',
    description: 'The Landmark Bestseller Now Revised and Updated',
    synopsis: 'Think and Grow Rich has been called the "Granddaddy of All Motivational Literature."',
    stock: 20,
    isbn: '978-1585424331',
    pages: 320,
    publishedDate: '2005-08-18',
    publisher: 'TarcherPerigee'
  }
]
