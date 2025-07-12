'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface BaseButtonProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

interface ButtonProps extends BaseButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

interface LinkButtonProps extends BaseButtonProps {
  href: string
  external?: boolean
}

const buttonVariants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
  outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
  ghost: 'hover:bg-gray-100 text-gray-700'
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed'

export function Button({ 
  children, 
  className, 
  disabled, 
  variant = 'primary', 
  size = 'md', 
  animated = false,
  onClick,
  type = 'button'
}: ButtonProps) {
  const Component = animated ? motion.button : 'button'
  const animationProps = animated ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  } : {}

  return (
    <Component
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

export function LinkButton({ 
  children, 
  href, 
  className, 
  variant = 'primary', 
  size = 'md', 
  animated = false,
  external = false
}: LinkButtonProps) {
  const Component = animated ? motion.div : 'div'
  const animationProps = animated ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  } : {}

  const linkProps = external ? {
    href,
    target: '_blank',
    rel: 'noopener noreferrer'
  } : { href }

  return (
    <Component {...animationProps}>
      <Link
        {...linkProps}
        className={cn(
          baseClasses,
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
      >
        {children}
      </Link>
    </Component>
  )
}
