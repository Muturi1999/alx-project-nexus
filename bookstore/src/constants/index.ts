export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

export const CATEGORIES = [
  'All',
  'Growth',
  'Financial',
  'Emotional Intelligence',
  'Spiritual',
  'Investment',
  'Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Sci-Fi',
  'Biography'
] as const

export const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Title (A-Z)', field: 'title', direction: 'asc' },
  { value: 'title-desc', label: 'Title (Z-A)', field: 'title', direction: 'desc' },
  { value: 'price-asc', label: 'Price (Low to High)', field: 'price', direction: 'asc' },
  { value: 'price-desc', label: 'Price (High to Low)', field: 'price', direction: 'desc' },
  { value: 'rating-desc', label: 'Rating (High to Low)', field: 'rating', direction: 'desc' },
  { value: 'publishedDate-desc', label: 'Newest First', field: 'publishedDate', direction: 'desc' },
] as const

export const ITEMS_PER_PAGE = 12

export const PRICE_RANGES = [
  { label: 'Under $10', min: 0, max: 10 },
  { label: '$10 - $20', min: 10, max: 20 },
  { label: '$20 - $30', min: 20, max: 30 },
  { label: '$30 - $50', min: 30, max: 50 },
  { label: 'Over $50', min: 50, max: Infinity },
] as const
