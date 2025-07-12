'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { NavigationHeader, SearchBar } from './mobile-components'

interface MobileLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showBack?: boolean
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  rightAction?: React.ReactNode
  className?: string
  backgroundPattern?: 'warm' | 'gradient' | 'plain'
}

export function MobileLayout({
  children,
  title,
  subtitle,
  showBack = false,
  showSearch = false,
  searchValue = '',
  onSearchChange,
  rightAction,
  className,
  backgroundPattern = 'warm'
}: MobileLayoutProps) {
  const backgroundClasses = {
    warm: 'bg-warm-200',
    gradient: 'bg-gradient-warm',
    plain: 'bg-white'
  }

  return (
    <div className={cn(
      'min-h-screen flex flex-col',
      backgroundClasses[backgroundPattern],
      className
    )}>
      {/* Header */}
      {(title || showSearch) && (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
          {title && (
            <NavigationHeader
              title={title}
              subtitle={subtitle}
              onBack={showBack ? () => window.history.back() : undefined}
              rightAction={rightAction}
            />
          )}
          
          {showSearch && (
            <div className="px-6 pb-4">
              <SearchBar
                value={searchValue}
                onChange={onSearchChange || (() => {})}
                placeholder="Search skills, people, or topics..."
              />
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/20 to-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-warm-300/30 to-warm-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

interface ContentGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ContentGrid({
  children,
  columns = 1,
  gap = 'md',
  className
}: ContentGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  }

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6'
  }

  return (
    <div className={cn(
      'grid',
      gridClasses[columns],
      gapClasses[gap],
      'p-4 relative z-10',
      className
    )}>
      {children}
    </div>
  )
}

interface SectionProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  spacing?: 'tight' | 'normal' | 'loose'
}

export function Section({
  title,
  subtitle,
  action,
  children,
  className,
  spacing = 'normal'
}: SectionProps) {
  const spacingClasses = {
    tight: 'space-y-3',
    normal: 'space-y-4',
    loose: 'space-y-6'
  }

  return (
    <section className={cn('relative z-10', spacingClasses[spacing], className)}>
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-display-small font-semibold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body-medium text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
      </div>
      <div className="px-6">
        {children}
      </div>
    </section>
  )
}

interface TabsProps {
  tabs: Array<{
    id: string
    label: string
    icon?: React.ReactNode
    count?: number
  }>
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className
}: TabsProps) {
  return (
    <div className={cn('bg-white border-b border-gray-100', className)}>
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center space-x-2 px-6 py-4 text-body-medium font-medium whitespace-nowrap border-b-2 transition-all duration-200',
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600 bg-primary-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            {tab.icon && (
              <span className={cn(
                'flex-shrink-0',
                activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'
              )}>
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={cn(
                'inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full',
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-600'
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileLayout
