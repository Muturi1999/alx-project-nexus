import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import booksSlice from './slices/booksSlice'
import cartSlice from './slices/cartSlice'
import authSlice from './slices/authSlice'
import uiSlice from './slices/uiSlice'
// import booksSlice from './slices/booksSlice'
// import cartSlice from './slices/cartSlice'
// import authSlice from './slices/authSlice'
// import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    books: booksSlice,
    cart: cartSlice,
    auth: authSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
