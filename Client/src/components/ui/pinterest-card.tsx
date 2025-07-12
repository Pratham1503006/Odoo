'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface PinterestCardProps {
  title: string
  subtitle?: string
  content: string
  imageUrl?: string
  progress?: number
  category?: string
  isActive?: boolean
  onAction?: () => void
  className?: string
  children?: React.ReactNode
}

export function PinterestCard({
  title,
  subtitle,
  content,
  imageUrl,
  progress,
  category,
  isActive = false,
  onAction,
  className,
  children
}: PinterestCardProps) {
  return (
    <div 
      className={cn(
        'card-mobile group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]',
        isActive && 'ring-2 ring-primary-500 shadow-strong',
        className
      )}
      onClick={onAction}
    >
      {/* Category Badge */}
      {category && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-chip text-caption font-medium bg-white/90 text-gray-700 backdrop-blur-sm border border-gray-200">
            {category}
          </span>
        </div>
      )}

      {/* Progress Circle */}
      {progress !== undefined && (
        <div className="absolute top-4 left-4 z-10">
          <div className="progress-circle">
            <span className="text-lg font-semibold">{progress}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-4">
        {subtitle && (
          <p className="text-caption text-gray-500 mb-1 uppercase tracking-wide font-medium">
            {subtitle}
          </p>
        )}
        <h3 className="text-headline font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
          {title}
        </h3>
      </div>

      {/* Content Section */}
      <div className="mb-6">
        <p className="text-body-medium text-gray-600 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Action Area */}
      {children && (
        <div className="mt-auto">
          {children}
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -bottom-1 -left-1 w-12 h-12 bg-gradient-to-br from-warm-300/30 to-warm-400/30 rounded-full blur-lg opacity-50" />
    </div>
  )
}

interface SkillCardProps {
  skillName: string
  level: 'Beginner' | 'Intermediate' | 'Expert'
  description: string
  examples: string[]
  isSelected?: boolean
  onToggle?: () => void
}

export function SkillCard({
  skillName,
  level,
  description,
  examples,
  isSelected = false,
  onToggle
}: SkillCardProps) {
  const levelColors = {
    Beginner: 'bg-green-100 text-green-800 border-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Expert: 'bg-red-100 text-red-800 border-red-200'
  }

  return (
    <div 
      className={cn(
        'content-card cursor-pointer',
        isSelected && 'ring-2 ring-primary-500 bg-gradient-content'
      )}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-title font-semibold text-gray-900">{skillName}</h4>
        <span className={cn(
          'inline-flex items-center px-2 py-1 rounded-chip text-xs font-medium border',
          levelColors[level]
        )}>
          {level}
        </span>
      </div>
      
      <p className="text-body-medium text-gray-600 mb-4">
        {description}
      </p>
      
      <div className="space-y-2">
        <p className="text-caption font-medium text-gray-700 uppercase tracking-wide">
          Examples:
        </p>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-chip text-caption bg-gray-100 text-gray-600 border border-gray-200"
            >
              {example}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PinterestCard
