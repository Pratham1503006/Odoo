import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState, User } from '../types'

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true })
          
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            throw new Error('Login failed')
          }

          const { user } = await response.json()
          set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        // Clear auth state
        set({ user: null, isAuthenticated: false })
        
        // Call logout API
        fetch('/api/auth/logout', { method: 'POST' })
          .catch(console.error)
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          const currentUser = get().user
          if (!currentUser) throw new Error('No user logged in')

          set({ isLoading: true })

          const response = await fetch('/api/user/profile', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            throw new Error('Profile update failed')
          }

          const { user } = await response.json()
          set({ user, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
