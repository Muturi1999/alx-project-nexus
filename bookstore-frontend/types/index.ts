// export interface Book {
//   id: number;
//   title: string;
//   author: string;
//   price: number;
//   originalPrice?: number;
//   rating: number;
//   reviewCount: number;
//   image: string;
//   category: string;
//   isOnSale?: boolean;
//   isBestseller?: boolean;
//   isNewRelease?: boolean;
// }

// export interface Category {
//   id: string;
//   name: string;
//   count?: number;
//   icon?: string;
//   color?: string;
// }

// export interface BookCardProps {
//   book: Book;
// }

// export interface BookSectionProps {
//   title: string;
//   books: Book[];
//   viewAllLink?: string;
// }

// export interface CategoryFilterProps {
//   selectedCategory: string;
//   onCategoryChange?: (categoryId: string) => void;
//   categories?: Category[];
// }

// export interface SearchBarProps {
//   onSearch?: (query: string) => void;
//   suggestions?: string[];
//   recentSearches?: string[];
//   isLoading?: boolean;
//   placeholder?: string;
// }

// export interface RatingStarsProps {
//   rating?: number;
//   maxRating?: number;
//   size?: 'sm' | 'md' | 'lg';
//   showRating?: boolean;
// }

// export interface LoadingSkeletonProps {
//   type?: 'book' | 'category' | 'hero' | 'list' | 'text';
//   count?: number;
// }

// export interface LayoutProps {
//   children: React.ReactNode;
// }

// types/book.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
  description: string;
  longDescription?: string;
  features?: string[];
  details: BookDetails;
  inStock: boolean;
  category: string;
  tags: string[];
}

export interface BookDetails {
  publisher: string;
  publicationDate: string;
  language: string;
  paperback: string;
  isbn10: string;
  isbn13: string;
  dimensions: string;
  weight: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}