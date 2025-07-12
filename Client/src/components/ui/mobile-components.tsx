'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ProgressStepsProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
  className?: string
}

export function ProgressSteps({ currentStep, totalSteps, labels, className }: ProgressStepsProps) {
  return (
    <div className={cn('flex items-center justify-center space-x-4', className)}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        
        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'progress-step',
                  isActive && 'progress-step-active',
                  isCompleted && 'progress-step-completed'
                )}
              />
              {labels && labels[index] && (
                <span className={cn(
                  'mt-2 text-caption font-medium',
                  isActive ? 'text-primary-600' : 'text-gray-500'
                )}>
                  {labels[index]}
                </span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div className="w-8 h-0.5 mx-2 bg-gray-200" />
            )}
          </div>
        )
      })}
    </div>
  )
}

interface NavigationHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  rightAction?: React.ReactNode
  className?: string
}

export function NavigationHeader({ 
  title, 
  subtitle, 
  onBack, 
  rightAction, 
  className 
}: NavigationHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between py-4 px-6 bg-white border-b border-gray-100', className)}>
      <div className="flex items-center space-x-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-button hover:bg-gray-100 transition-colors duration-200"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {/* SkillSwap Logo - Always visible, links to homepage */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
          <div className="relative">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM15 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          </div>
          <span className="text-lg font-bold text-gray-900">SkillSwap</span>
        </Link>
        
        <div>
          <h1 className="text-headline font-semibold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-body-medium text-gray-600">{subtitle}</p>
          )}
        </div>
      </div>
      
      {rightAction && (
        <div className="flex items-center">
          {rightAction}
        </div>
      )}
    </div>
  )
}

interface FloatingActionButtonProps {
  onClick: () => void
  icon: React.ReactNode
  label?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  className?: string
}

export function FloatingActionButton({
  onClick,
  icon,
  label,
  position = 'bottom-right',
  className
}: FloatingActionButtonProps) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed z-50 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-strong hover:shadow-xl transition-all duration-300 flex items-center justify-center group',
        positionClasses[position],
        className
      )}
      aria-label={label}
    >
      <div className="transform group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      
      {label && (
        <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-caption rounded-button opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  )
}

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onFocus,
  onBlur,
  className
}: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className="input-base pl-11 pr-4"
      />
    </div>
  )
}

export default ProgressSteps
