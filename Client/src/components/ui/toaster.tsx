'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

// Simple toast store (in a real app, you might use Zustand or similar)
const toastStore: ToastStore = {
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
}

const icons = {
  success: CheckCircleIcon,
  error: ExclamationTriangleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
}

const colors = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-600',
    title: 'text-green-900',
    message: 'text-green-700',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
    title: 'text-red-900',
    message: 'text-red-700',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-600',
    title: 'text-yellow-900',
    message: 'text-yellow-700',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
    message: 'text-blue-700',
  },
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    toastStore.addToast = (toast) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newToast = { ...toast, id }
      setToasts(prev => [...prev, newToast])
      
      // Auto remove after duration
      setTimeout(() => {
        toastStore.removeToast(id)
      }, toast.duration || 5000)
    }

    toastStore.removeToast = (id) => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          const color = colors[toast.type]
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-lg border p-4 shadow-lg ${color.bg} ${color.border}`}
            >
              <div className="flex items-start">
                <Icon className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${color.icon}`} />
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${color.title}`}>
                    {toast.title}
                  </p>
                  {toast.message && (
                    <p className={`mt-1 text-sm ${color.message}`}>
                      {toast.message}
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => toastStore.removeToast(toast.id)}
                  className={`ml-3 inline-flex rounded-md p-1.5 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${color.icon}`}
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Export toast function for use throughout the app
export const toast = {
  success: (title: string, message?: string, duration?: number) => 
    toastStore.addToast({ type: 'success', title, message, duration }),
  
  error: (title: string, message?: string, duration?: number) => 
    toastStore.addToast({ type: 'error', title, message, duration }),
  
  warning: (title: string, message?: string, duration?: number) => 
    toastStore.addToast({ type: 'warning', title, message, duration }),
  
  info: (title: string, message?: string, duration?: number) => 
    toastStore.addToast({ type: 'info', title, message, duration }),
}
