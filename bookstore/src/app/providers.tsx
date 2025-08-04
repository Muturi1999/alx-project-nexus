'use client'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store'
import { loadUserFromStorage } from '@/store/slices/authSlice'

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [dispatch])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  )
}
