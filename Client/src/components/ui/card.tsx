'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  animated?: boolean
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  onClick?: () => void
}

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  animated?: boolean
}

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating?: number
  avatar?: string
  className?: string
  animated?: boolean
}

const paddingVariants = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

const shadowVariants = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg'
}

export function Card({
  children,
  className,
  hover = true,
  animated = false,
  padding = 'md',
  shadow = 'sm',
  border = true,
  onClick
}: CardProps) {
  const Component = animated ? motion.div : 'div'
  const animationProps = animated ? {
    whileHover: { scale: 1.02, y: -4 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <Component
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl',
        paddingVariants[padding],
        shadowVariants[shadow],
        border && 'border border-gray-200',
        hover && 'hover:shadow-lg transition-all duration-300',
        onClick && 'cursor-pointer',
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
  animated = true
}: FeatureCardProps) {
  return (
    <Card 
      className={className} 
      animated={animated}
      hover={true}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 mb-6">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </Card>
  )
}

export function TestimonialCard({
  name,
  role,
  content,
  rating = 5,
  avatar,
  className,
  animated = true
}: TestimonialCardProps) {
  return (
    <Card 
      className={className} 
      animated={animated}
      hover={true}
      padding="lg"
    >
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center">
        {avatar ? (
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={avatar}
            alt={name}
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </Card>
  )
}
