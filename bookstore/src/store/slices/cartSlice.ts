import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Book, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
}

const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id)
        } else {
          item.quantity = action.payload.quantity
        }
        const totals = calculateTotals(state.items)
        state.total = totals.total
        state.itemCount = totals.itemCount
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  setCartOpen 
} = cartSlice.actions

export default cartSlice.reducer
