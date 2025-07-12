'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { AnimatedSection } from './animated-section'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  background?: 'white' | 'gray' | 'gradient' | 'warm'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full'
  id?: string
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
  animated?: boolean
}

const backgroundVariants = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  warm: 'bg-warm-200'
}

const paddingVariants = {
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-20',
  xl: 'py-24'
}

const maxWidthVariants = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full'
}

export function Section({
  children,
  className,
  containerClassName,
  background = 'white',
  padding = 'lg',
  animated = true,
  maxWidth = '7xl',
  id
}: SectionProps) {
  const content = (
    <section
      id={id}
      className={cn(
        backgroundVariants[background],
        paddingVariants[padding],
        className
      )}
    >
      <div className={cn(
        'mx-auto px-6 lg:px-8',
        maxWidthVariants[maxWidth],
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )

  if (animated) {
    return (
      <AnimatedSection>
        {content}
      </AnimatedSection>
    )
  }

  return content
}

export function SectionHeader({
  title,
  subtitle,
  description,
  centered = true,
  className,
  animated = true
}: SectionHeaderProps) {
  const content = (
    <div className={cn(
      centered ? 'text-center' : 'text-left',
      'mb-16',
      className
    )}>
      {subtitle && (
        <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )

  if (animated) {
    return (
      <AnimatedSection delay={0.1}>
        {content}
      </AnimatedSection>
    )
  }

  return content
}

export function SectionGrid({
  children,
  columns = 3,
  gap = 'lg',
  className
}: {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const columnVariants = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  const gapVariants = {
    sm: 'gap-6',
    md: 'gap-8',
    lg: 'gap-12'
  }

  return (
    <div className={cn(
      'grid',
      columnVariants[columns],
      gapVariants[gap],
      className
    )}>
      {children}
    </div>
  )
}
