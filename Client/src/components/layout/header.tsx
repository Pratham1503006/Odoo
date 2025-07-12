'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../hooks/use-auth'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon, 
  SparklesIcon, 
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  BellIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Features', href: '#features' },
  { name: 'Mobile Prototype', href: '/mobile-prototype' },
  { name: 'Explore Skills', href: '/explore' },
  { name: 'Community', href: '/community' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">SkillSwap</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <SparklesIcon className="h-8 w-8 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold text-gray-900">SkillSwap</span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Messages */}
              <Link href="/messages" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* Profile */}
              <Link href="/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-600" />
                )}
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">SkillSwap</span>
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="h-8 w-8 text-blue-600" />
                    <span className="text-xl font-bold text-gray-900">SkillSwap</span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="py-6">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/messages"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Messages
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          href="/auth/login"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Log in
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-600 hover:bg-blue-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
