import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  sidebarOpen: boolean
  searchQuery: string
  currentView: 'grid' | 'list'
  showFilters: boolean
  loading: {
    global: boolean
    books: boolean
    cart: boolean
  }
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    timestamp: number
  }>
}

const initialState: UiState = {
  sidebarOpen: false,
  searchQuery: '',
  currentView: 'grid',
  showFilters: false,
  loading: {
    global: false,
    books: false,
    cart: false,
  },
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    
    setCurrentView: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.currentView = action.payload
    },
    
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters
    },
    
    setShowFilters: (state, action: PayloadAction<boolean>) => {
      state.showFilters = action.payload
    },
    
    setLoading: (state, action: PayloadAction<{ key: keyof UiState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value
    },
    
    addNotification: (state, action: PayloadAction<{
      type: 'success' | 'error' | 'warning' | 'info'
      message: string
    }>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      state.notifications.push(notification)
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setSearchQuery,
  setCurrentView,
  toggleFilters,
  setShowFilters,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions

export default uiSlice.reducer