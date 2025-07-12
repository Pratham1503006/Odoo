'use client'

import { motion } from 'framer-motion'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Loading({ size = 'md', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-blue-200 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loading size="lg" />
        <p className="mt-4 text-gray-600">Loading SkillSwap...</p>
      </div>
    </div>
  )
}
