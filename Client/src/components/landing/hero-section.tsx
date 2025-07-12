'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRightIcon, SparklesIcon, UsersIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16 sm:pt-24 sm:pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200">
              <SparklesIcon className="h-4 w-4" />
              <span>New: AI-powered skill matching</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
          >
            Exchange Skills,{' '}
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Build Connections
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl"
          >
            SkillSwap makes learning frictionless. Connect with people who want to learn what you know, 
            and learn what you've always wanted to master. No courses, no fees—just genuine human connections.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6"
          >
            <Link
              href="/auth/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105"
            >
              Start Swapping Skills
              <ChevronRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm px-8 py-4 text-lg font-medium text-gray-700 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Explore Skills
            </Link>

            <Link
              href="/mobile-prototype"
              className="inline-flex items-center gap-2 rounded-full border border-primary-300 bg-gradient-to-r from-primary-50 to-warm-100 px-6 py-3 text-base font-medium text-primary-700 hover:from-primary-100 hover:to-warm-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Mobile Prototype Demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <div className="text-center">
              <div className="flex items-center justify-center">
                <UsersIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">Active learners</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center">
                <LightBulbIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Skills available</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center">
                <SparklesIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold text-gray-900">25,000+</div>
                <div className="text-sm text-gray-600">Skills exchanged</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Demo video/image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">See SkillSwap in Action</h3>
                <p className="text-gray-600">Watch how easy it is to find and connect with skill partners</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute top-4 left-10 w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="absolute top-4 left-16 w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
