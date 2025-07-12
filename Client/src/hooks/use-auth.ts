'use client'

import { useAuthStore } from '../store/auth-store'

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout, updateProfile } = useAuthStore()

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
  }
}
