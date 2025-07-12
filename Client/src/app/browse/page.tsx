'use client'

import { useState, useEffect } from 'react'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
  MapPinIcon,
  StarIcon,
  HeartIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { dbHelpers, SkillOffered } from '../../lib/supabase'

interface SkillWithUser extends SkillOffered {
  users?: {
    name: string
    location: string
    avatar?: string
    privacy: string
  }
}

const categories = [
  'All Categories',
  'Programming',
  'Design',
  'Marketing',
  'Business',
  'Languages',
  'Music',
  'Art',
  'Cooking',
  'Fitness'
]

export default function BrowseSkillsPage() {
  const [skills, setSkills] = useState<SkillWithUser[]>([])
  const [filteredSkills, setFilteredSkills] = useState<SkillWithUser[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const { data, error } = await dbHelpers.skills.getAllOffered();

        if (error) {
          console.error('Error fetching skills:', error);
          return;
        }

        setSkills(data || []);
        setFilteredSkills(data || []);
      } catch (error) {
        console.error('Error loading skills:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, [])

  useEffect(() => {
    let filtered = skills

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(skill =>
        skill.skill_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.users?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(skill => skill.category === selectedCategory)
    }

    setFilteredSkills(filtered)
  }, [searchQuery, selectedCategory, skills])

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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Skills</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing skills from talented people in your community. Find someone to learn from or teach what you know.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills, people, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input min-w-[200px]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button className="btn-secondary flex items-center">
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
              {/* User Info */}
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  {skill.users?.avatar ? (
                    <img
                      src={skill.users.avatar}
                      alt={skill.users.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-900">{skill.users?.name || 'Anonymous'}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    {skill.users?.location || 'Location not specified'}
                  </div>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">5.0</span>
                </div>
              </div>

              {/* Skill Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.skill_name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
              </div>

              {/* Category and Actions */}
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">
                  {skill.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <HeartIcon className="h-4 w-4" />
                  </button>
                  <button className="btn-primary text-sm flex items-center">
                    Connect
                    <ArrowRightIcon className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
