import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '@/services/api'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await authApi.login(email, password)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response
    } catch (error) {
      // Mock login for development
      if (email === 'admin@bookstore.com' && password === 'admin123') {
        const mockResponse = {
          user: {
            id: '1',
            email: 'admin@bookstore.com',
            name: 'Admin User',
            role: 'admin' as const
          },
          token: 'mock-admin-token'
        }
        localStorage.setItem('token', mockResponse.token)
        localStorage.setItem('user', JSON.stringify(mockResponse.user))
        return mockResponse
      } else if (email === 'user@example.com' && password === 'user123') {
        const mockResponse = {
          user: {
            id: '2',
            email: 'user@example.com',
            name: 'John Doe',
            role: 'customer' as const
          },
          token: 'mock-user-token'
        }
        localStorage.setItem('token', mockResponse.token)
        localStorage.setItem('user', JSON.stringify(mockResponse.user))
        return mockResponse
      }
      throw new Error('Invalid credentials')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: {
    email: string
    password: string
    name: string
    // address?: any
    address?: unknown

  }) => {
    try {
      const response = await authApi.register(userData)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response
    } catch (error) {
      // Mock registration for development
      const mockResponse = {
        user: {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          role: 'customer' as const,
          address: userData.address
        },
        token: 'mock-registered-token'
      }
      localStorage.setItem('token', mockResponse.token)
      localStorage.setItem('user', JSON.stringify(mockResponse.user))
      return mockResponse
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await authApi.logout()
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    try {
      return await authApi.getCurrentUser()
    } catch (error) {
      // Check localStorage for mock user
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        return JSON.parse(storedUser)
      }
      throw error
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        state.token = token
        state.user = JSON.parse(userStr)
        state.isAuthenticated = true
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Registration failed'
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
      
      // Get current user
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
  },
})

export const { clearError, loadUserFromStorage } = authSlice.actions
export default authSlice.reducer
