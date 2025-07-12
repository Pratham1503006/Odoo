'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SkillSwapLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
  textClassName?: string
  href?: string
}

export function SkillSwapLogo({ 
  size = 'md', 
  showText = true, 
  className,
  textClassName,
  href = '/'
}: SkillSwapLogoProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  }

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <Link 
      href={href} 
      className={cn(
        'inline-flex items-center gap-2 hover:opacity-80 transition-opacity duration-200',
        className
      )}
    >
      <div className="relative">
        <svg 
          className={cn('text-blue-600', sizeClasses[size])} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM15 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" 
          />
        </svg>
        <div className={cn(
          'absolute -top-0.5 -right-0.5 bg-purple-500 rounded-full animate-pulse',
          dotSizeClasses[size]
        )} />
      </div>
      {showText && (
        <span className={cn(
          'font-bold text-gray-900',
          textSizeClasses[size],
          textClassName
        )}>
          SkillSwap
        </span>
      )}
    </Link>
  )
}

// Quick homepage link component
export function HomeLink({ 
  children, 
  className 
}: { 
  children?: React.ReactNode
  className?: string 
}) {
  return (
    <Link 
      href="/" 
      className={cn(
        'inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200',
        className
      )}
    >
      {children || '← Back to SkillSwap'}
    </Link>
  )
}
