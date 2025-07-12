'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useAuthStore } from '../store/auth-store'

interface AuthContextType {
  // This context provides the auth store globally
}

const AuthContext = createContext<AuthContextType>({})

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser)
  const setLoading = useAuthStore((state) => state.setLoading)

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      try {
        setLoading(true)
        
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        })

        if (response.ok) {
          const { user } = await response.json()
          setUser(user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [setUser, setLoading])

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
