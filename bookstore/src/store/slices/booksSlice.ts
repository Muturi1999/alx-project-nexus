import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { booksApi, mockBooks } from '@/services/api'
import type { Book, FilterOptions, SortOptions, PaginatedResponse } from '@/types'

interface BooksState {
  items: Book[]
  featuredBooks: Book[]
  bestSellers: Book[]
  currentBook: Book | null
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  filters: FilterOptions
  sort: SortOptions
}

const initialState: BooksState = {
  items: [],
  featuredBooks: [],
  bestSellers: [],
  currentBook: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  hasNextPage: false,
  filters: {},
  sort: { field: 'title', direction: 'asc' },
}

// Async thunks
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ page = 1, filters, sort }: { 
    page?: number
    filters?: FilterOptions
    sort?: SortOptions 
  } = {}) => {
    try {
      return await booksApi.getBooks(page, filters, sort)
    } catch (error) {
      // Fallback to mock data during development
      console.warn('API not available, using mock data')
      const filteredBooks = mockBooks.filter(book => {
        if (filters?.category && filters.category !== 'All' && book.category !== filters.category) {
          return false
        }
        if (filters?.search && !book.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            !book.author.toLowerCase().includes(filters.search.toLowerCase())) {
          return false
        }
        if (filters?.minPrice && book.price < filters.minPrice) return false
        if (filters?.maxPrice && book.price > filters.maxPrice) return false
        if (filters?.rating && book.rating < filters.rating) return false
        return true
      })

      const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (!sort) return 0
        const aValue = a[sort.field]
        const bValue = b[sort.field]
        const modifier = sort.direction === 'asc' ? 1 : -1
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * modifier
        }
        return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * modifier
      })

      const startIndex = (page - 1) * 12
      const endIndex = startIndex + 12
      const paginatedBooks = sortedBooks.slice(startIndex, endIndex)
      
      return {
        data: paginatedBooks,
        currentPage: page,
        totalPages: Math.ceil(sortedBooks.length / 12),
        totalItems: sortedBooks.length,
        hasNextPage: endIndex < sortedBooks.length,
        hasPreviousPage: page > 1,
      }
    }
  }
)

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (id: string) => {
    try {
      return await booksApi.getBook(id)
    } catch (error) {
      // Fallback to mock data
      const book = mockBooks.find(b => b.id === id)
      if (!book) throw new Error('Book not found')
      return book
    }
  }
)

export const fetchFeaturedBooks = createAsyncThunk(
  'books/fetchFeaturedBooks',
  async () => {
    try {
      return await booksApi.getFeaturedBooks()
    } catch (error) {
      return mockBooks.slice(0, 4)
    }
  }
)

export const fetchBestSellers = createAsyncThunk(
  'books/fetchBestSellers',
  async () => {
    try {
      return await booksApi.getBestSellers()
    } catch (error) {
      return mockBooks.filter(book => book.rating >= 4.5)
    }
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = action.payload
      state.currentPage = 1 // Reset to first page when filters change
    },
    setSort: (state, action: PayloadAction<SortOptions>) => {
      state.sort = action.payload
      state.currentPage = 1 // Reset to first page when sort changes
    },
    clearError: (state) => {
      state.error = null
    },
    resetBooks: (state) => {
      state.items = []
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.currentPage = action.payload.currentPage
        state.totalPages = action.payload.totalPages
        state.totalItems = action.payload.totalItems
        state.hasNextPage = action.payload.hasNextPage
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch books'
      })
      
      // Fetch single book
      .addCase(fetchBook.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loading = false
        state.currentBook = action.payload
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch book'
      })
      
      // Fetch featured books
      .addCase(fetchFeaturedBooks.fulfilled, (state, action) => {
        state.featuredBooks = action.payload
      })
      
      // Fetch best sellers
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.bestSellers = action.payload
      })
  },
})

export const { setFilters, setSort, clearError, resetBooks } = booksSlice.actions
export default booksSlice.reducer