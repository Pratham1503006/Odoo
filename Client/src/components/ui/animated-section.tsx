'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  viewport?: boolean
  stagger?: boolean
  staggerDelay?: number
}

const directionVariants = {
  up: { y: 40, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: 40, opacity: 0 },
  right: { x: -40, opacity: 0 },
  fade: { opacity: 0 }
}

const visibleVariants = {
  up: { y: 0, opacity: 1 },
  down: { y: 0, opacity: 1 },
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  fade: { opacity: 1 }
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  viewport = true,
  stagger = false,
  staggerDelay = 0.1
}: AnimatedSectionProps) {
  const viewportProps = viewport ? {
    viewport: { once: true }
  } : {}

  if (stagger && React.Children.count(children) > 1) {
    return (
      <div className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            initial={directionVariants[direction]}
            whileInView={visibleVariants[direction]}
            transition={{ 
              duration, 
              delay: delay + (index * staggerDelay) 
            }}
            {...viewportProps}
          >
            {child}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={visibleVariants[direction]}
      transition={{ duration, delay }}
      className={className}
      {...viewportProps}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedContainer({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0
}: {
  children: React.ReactNode
  className?: string
  staggerChildren?: number
  delayChildren?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        staggerChildren,
        delayChildren
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({
  children,
  className,
  direction = 'up'
}: {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
}) {
  const variants = {
    hidden: directionVariants[direction],
    visible: visibleVariants[direction]
  }

  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
