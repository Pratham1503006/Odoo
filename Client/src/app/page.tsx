'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authHelpers } from '../lib/supabase'

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user has an active Supabase session
        const { session } = await authHelpers.getSession()

        if (session) {
          // Redirect authenticated users to dashboard
          router.push('/dashboard')
          return
        }
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Skill Swap Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Skill Swap Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Exchange skills with people in your community
            </p>
            
            <div className="flex justify-center space-x-4 mb-12">
              <Link
                href="/auth/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 px-8 py-3 rounded-md text-lg font-medium"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Offer Skills
                </h3>
                <p className="text-gray-600">
                  Share your expertise and help others learn new skills
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Learn Skills
                </h3>
                <p className="text-gray-600">
                  Find people who can teach you the skills you want to learn
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Connect
                </h3>
                <p className="text-gray-600">
                  Build connections with like-minded people in your area
                </p>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Platform Status
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Backend API: <span className="text-green-600 font-medium">Ready</span>
                </p>
                <p className="text-sm text-gray-600">
                  Database: <span className="text-green-600 font-medium">Connected</span>
                </p>
                <p className="text-sm text-gray-600">
                  Frontend: <span className="text-green-600 font-medium">Active</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
