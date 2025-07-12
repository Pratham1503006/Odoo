'use client'

import { useState, useEffect } from 'react'
import { 
  CameraIcon,
  PencilIcon,
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface User {
  id: string
  name: string
  email: string
  location: string
  bio: string
  avatar?: string
  availability: string
  isPublic: boolean
  joinedDate: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    location: '',
    bio: '',
    availability: '',
    isPublic: true
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock user data - replace with actual API call
    const mockUser: User = {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      location: 'San Francisco, CA',
      bio: 'Passionate developer and designer with 5+ years of experience. Love teaching and learning new technologies. Always excited to share knowledge and connect with fellow creators.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
      availability: 'Available weekends',
      isPublic: true,
      joinedDate: '2024-01-15'
    }

    setUser(mockUser)
    setEditForm({
      name: mockUser.name,
      location: mockUser.location,
      bio: mockUser.bio,
      availability: mockUser.availability,
      isPublic: mockUser.isPublic
    })
    setLoading(false)
  }, [])

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        ...editForm
      })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (user) {
      setEditForm({
        name: user.name,
        location: user.location,
        bio: user.bio,
        availability: user.availability,
        isPublic: user.isPublic
      })
    }
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
            <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-colors">
              <CameraIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-start -mt-16 mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-24 w-24 rounded-full object-cover" 
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {user?.name.charAt(0)}
                    </span>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <CameraIcon className="h-3 w-3 text-gray-600" />
                </button>
              </div>

              <div className="ml-6 flex-1 mt-16">
                <div className="flex items-center justify-between">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="input text-2xl font-bold"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                    )}
                    <p className="text-gray-600">{user?.email}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="btn-primary flex items-center"
                        >
                          <CheckIcon className="h-4 w-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="btn-secondary flex items-center"
                        >
                          <XMarkIcon className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-secondary flex items-center"
                      >
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="input flex-1"
                        placeholder="Your location"
                      />
                    ) : (
                      <span>{user?.location}</span>
                    )}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.availability}
                        onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                        className="input flex-1"
                        placeholder="Your availability"
                      />
                    ) : (
                      <span>{user?.availability}</span>
                    )}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <GlobeAltIcon className="h-4 w-4 mr-2" />
                    <span>Joined {new Date(user?.joinedDate || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="input w-full h-24 resize-none"
                  placeholder="Tell others about yourself..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {user?.bio || 'No bio added yet.'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Privacy Settings */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Public Profile</h3>
                  <p className="text-sm text-gray-600">Make your profile visible to everyone</p>
                </div>
                <button
                  onClick={() => setEditForm({ ...editForm, isPublic: !editForm.isPublic })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editForm.isPublic ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editForm.isPublic ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Show Email</h3>
                  <p className="text-sm text-gray-600">Display your email on your profile</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Show Location</h3>
                  <p className="text-sm text-gray-600">Display your location on your profile</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="space-y-4">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                <h3 className="font-medium text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-600">Update your account password</p>
              </button>

              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                <h3 className="font-medium text-gray-900">Notification Settings</h3>
                <p className="text-sm text-gray-600">Manage your email and push notifications</p>
              </button>

              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                <h3 className="font-medium text-gray-900">Connected Accounts</h3>
                <p className="text-sm text-gray-600">Link your social media accounts</p>
              </button>

              <button className="w-full text-left p-3 border border-red-200 rounded-lg hover:border-red-300 transition-colors text-red-600">
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm">Permanently delete your account and data</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
