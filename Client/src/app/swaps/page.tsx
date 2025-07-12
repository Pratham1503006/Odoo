'use client'

import { useState, useEffect } from 'react'
import { 
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface SwapRequest {
  id: string
  status: 'pending' | 'accepted' | 'declined' | 'completed'
  type: 'sent' | 'received'
  skillOffered: {
    id: string
    name: string
    category: string
  }
  skillWanted: {
    id: string
    name: string
    category: string
  }
  otherUser: {
    id: string
    name: string
    avatar?: string
    rating: number
    location: string
  }
  message: string
  createdAt: string
  updatedAt: string
}

export default function SwapsPage() {
  const [swaps, setSwaps] = useState<SwapRequest[]>([])
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'active' | 'completed'>('received')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock swap data - replace with actual API call
    const mockSwaps: SwapRequest[] = [
      {
        id: '1',
        status: 'pending',
        type: 'received',
        skillOffered: { id: '1', name: 'React Development', category: 'Programming' },
        skillWanted: { id: '2', name: 'UI/UX Design', category: 'Design' },
        otherUser: {
          id: '2',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=faces',
          rating: 4.9,
          location: 'San Francisco, CA'
        },
        message: 'Hi! I\'d love to learn React from you. I have extensive experience in UI/UX design and would be happy to teach you.',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        status: 'accepted',
        type: 'sent',
        skillOffered: { id: '3', name: 'Python', category: 'Programming' },
        skillWanted: { id: '4', name: 'Digital Marketing', category: 'Marketing' },
        otherUser: {
          id: '3',
          name: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
          rating: 4.7,
          location: 'New York, NY'
        },
        message: 'Looking forward to learning Python! I can help you with SEO and social media marketing.',
        createdAt: '2024-01-14T15:20:00Z',
        updatedAt: '2024-01-14T16:45:00Z'
      },
      {
        id: '3',
        status: 'completed',
        type: 'received',
        skillOffered: { id: '5', name: 'Spanish', category: 'Languages' },
        skillWanted: { id: '6', name: 'Guitar', category: 'Music' },
        otherUser: {
          id: '4',
          name: 'Maria Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
          rating: 5.0,
          location: 'Austin, TX'
        },
        message: 'Great swap! Thanks for teaching me guitar basics.',
        createdAt: '2024-01-10T09:15:00Z',
        updatedAt: '2024-01-13T14:30:00Z'
      }
    ]

    setSwaps(mockSwaps)
    setLoading(false)
  }, [])

  const handleAcceptSwap = (swapId: string) => {
    setSwaps(swaps.map(swap => 
      swap.id === swapId ? { ...swap, status: 'accepted' as const } : swap
    ))
  }

  const handleDeclineSwap = (swapId: string) => {
    setSwaps(swaps.map(swap => 
      swap.id === swapId ? { ...swap, status: 'declined' as const } : swap
    ))
  }

  const getFilteredSwaps = () => {
    switch (activeTab) {
      case 'received':
        return swaps.filter(swap => swap.type === 'received' && swap.status === 'pending')
      case 'sent':
        return swaps.filter(swap => swap.type === 'sent' && swap.status === 'pending')
      case 'active':
        return swaps.filter(swap => swap.status === 'accepted')
      case 'completed':
        return swaps.filter(swap => swap.status === 'completed')
      default:
        return []
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const filteredSwaps = getFilteredSwaps()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Skill Swaps</h1>
          <p className="text-lg text-gray-600">
            Manage your skill exchange requests and active swaps.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'received', label: 'Received', count: swaps.filter(s => s.type === 'received' && s.status === 'pending').length },
                { key: 'sent', label: 'Sent', count: swaps.filter(s => s.type === 'sent' && s.status === 'pending').length },
                { key: 'active', label: 'Active', count: swaps.filter(s => s.status === 'accepted').length },
                { key: 'completed', label: 'Completed', count: swaps.filter(s => s.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.key ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Swap Cards */}
          <div className="p-6">
            {filteredSwaps.length === 0 ? (
              <div className="text-center py-12">
                <ClockIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No swaps found</h3>
                <p className="text-gray-600">
                  {activeTab === 'received' && 'You haven\'t received any swap requests yet.'}
                  {activeTab === 'sent' && 'You haven\'t sent any swap requests yet.'}
                  {activeTab === 'active' && 'You don\'t have any active swaps.'}
                  {activeTab === 'completed' && 'You haven\'t completed any swaps yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSwaps.map((swap) => (
                  <div key={swap.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                          {swap.otherUser.avatar ? (
                            <img 
                              src={swap.otherUser.avatar} 
                              alt={swap.otherUser.name} 
                              className="h-12 w-12 rounded-full object-cover" 
                            />
                          ) : (
                            <UserIcon className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{swap.otherUser.name}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <span>{swap.otherUser.location}</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <StarIcon className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                              {swap.otherUser.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                        {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                      </span>
                    </div>

                    {/* Skill Exchange */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-sm text-gray-600 mb-1">
                            {swap.type === 'sent' ? 'You offer' : 'They offer'}
                          </p>
                          <p className="font-medium text-gray-900">{swap.skillOffered.name}</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                            {swap.skillOffered.category}
                          </span>
                        </div>
                        <ArrowRightIcon className="h-5 w-5 text-gray-400 mx-4" />
                        <div className="text-center flex-1">
                          <p className="text-sm text-gray-600 mb-1">
                            {swap.type === 'sent' ? 'You want' : 'They want'}
                          </p>
                          <p className="font-medium text-gray-900">{swap.skillWanted.name}</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                            {swap.skillWanted.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <p className="text-gray-700 italic">"{swap.message}"</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {new Date(swap.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-3">
                        {swap.status === 'pending' && swap.type === 'received' && (
                          <>
                            <button
                              onClick={() => handleDeclineSwap(swap.id)}
                              className="btn-secondary flex items-center text-sm"
                            >
                              <XMarkIcon className="h-4 w-4 mr-2" />
                              Decline
                            </button>
                            <button
                              onClick={() => handleAcceptSwap(swap.id)}
                              className="btn-primary flex items-center text-sm"
                            >
                              <CheckIcon className="h-4 w-4 mr-2" />
                              Accept
                            </button>
                          </>
                        )}
                        {(swap.status === 'accepted' || swap.status === 'completed') && (
                          <button className="btn-secondary flex items-center text-sm">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                            Message
                          </button>
                        )}
                        {swap.status === 'completed' && (
                          <button className="btn-primary flex items-center text-sm">
                            <StarIcon className="h-4 w-4 mr-2" />
                            Rate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
