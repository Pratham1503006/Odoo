'use client'

import React, { useState } from 'react'
import { MobileLayout, ContentGrid, Section, Tabs } from '@/components/ui/mobile-layout'
import { PinterestCard, SkillCard } from '@/components/ui/pinterest-card'
import { ProgressSteps, FloatingActionButton, SearchBar } from '@/components/ui/mobile-components'
import { SkillSwapLogo } from '@/components/ui/skillswap-logo'

const sampleSkills = [
  {
    id: '1',
    name: 'React Development',
    level: 'Expert' as const,
    description: 'Building modern web applications with React, hooks, and TypeScript',
    examples: ['Custom Hooks', 'State Management', 'Performance Optimization']
  },
  {
    id: '2',
    name: 'UI/UX Design',
    level: 'Intermediate' as const,
    description: 'Creating beautiful and intuitive user interfaces with modern design principles',
    examples: ['Figma', 'Prototyping', 'User Research']
  },
  {
    id: '3',
    name: 'Photography',
    level: 'Beginner' as const,
    description: 'Capturing moments and learning composition, lighting, and post-processing',
    examples: ['Portrait', 'Landscape', 'Street Photography']
  }
]

const sampleContent = [
  {
    id: '1',
    title: 'Learn About Web Development',
    subtitle: 'Technology',
    content: 'Master modern web development techniques and build amazing applications that users love.',
    category: 'Development',
    progress: 23
  },
  {
    id: '2',
    title: 'Design Fundamentals',
    subtitle: 'Creative',
    content: 'Understand the principles of good design and create beautiful, functional interfaces.',
    category: 'Design',
    progress: 47
  },
  {
    id: '3',
    title: 'Digital Marketing',
    subtitle: 'Business',
    content: 'Learn how to effectively market products and services in the digital age.',
    category: 'Marketing',
    progress: 12
  }
]

export default function MobilePrototype() {
  const [activeTab, setActiveTab] = useState('explore')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState('')

  const tabs = [
    {
      id: 'explore',
      label: 'Explore',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      count: 124
    },
    {
      id: 'my-skills',
      label: 'My Skills',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      count: 8
    },
    {
      id: 'matches',
      label: 'Matches',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      count: 3
    }
  ]

  const toggleSkillSelection = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    )
  }

  const renderExploreTab = () => (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Section 
        title="Your Learning Journey" 
        subtitle="Complete your profile to unlock more matches"
      >
        <div className="bg-white rounded-card p-6 shadow-soft">
          <ProgressSteps 
            currentStep={2} 
            totalSteps={3} 
            labels={['Profile', 'Skills', 'Preferences']}
          />
        </div>
      </Section>

      {/* Featured Content */}
      <Section title="Recommended for You" subtitle="Based on your interests">
        <ContentGrid columns={1} gap="md">
          {sampleContent.map((item) => (
            <PinterestCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              content={item.content}
              category={item.category}
              progress={item.progress}
              onAction={() => console.log('Clicked:', item.title)}
            >
              <div className="flex items-center justify-between">
                <button className="btn-ghost text-sm">
                  Learn More
                </button>
                <button className="btn-primary text-sm">
                  Start Learning
                </button>
              </div>
            </PinterestCard>
          ))}
        </ContentGrid>
      </Section>
    </div>
  )

  const renderMySkillsTab = () => (
    <Section 
      title="Your Skills" 
      subtitle="Manage your skills and expertise levels"
      action={
        <button className="text-body-medium text-primary-600 font-medium">
          Add Skill
        </button>
      }
    >
      <ContentGrid columns={1} gap="md">
        {sampleSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skillName={skill.name}
            level={skill.level}
            description={skill.description}
            examples={skill.examples}
            isSelected={selectedSkills.includes(skill.id)}
            onToggle={() => toggleSkillSelection(skill.id)}
          />
        ))}
      </ContentGrid>
    </Section>
  )

  const renderMatchesTab = () => (
    <Section 
      title="Skill Matches" 
      subtitle="People looking to learn what you can teach"
    >
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="bg-white rounded-card p-6 shadow-soft">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {String.fromCharCode(65 + i)}
              </div>
              <div className="flex-1">
                <h4 className="text-title font-semibold text-gray-900">
                  Sarah Johnson
                </h4>
                <p className="text-body-medium text-gray-600 mb-2">
                  Wants to learn React Development
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">HTML/CSS</span>
                </div>
                <div className="flex space-x-3">
                  <button className="btn-secondary text-sm">
                    View Profile
                  </button>
                  <button className="btn-primary text-sm">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'explore':
        return renderExploreTab()
      case 'my-skills':
        return renderMySkillsTab()
      case 'matches':
        return renderMatchesTab()
      default:
        return renderExploreTab()
    }
  }

  return (
    <MobileLayout
      showSearch={false}
      rightAction={
        <button className="p-2 rounded-button hover:bg-gray-100 transition-colors duration-200">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17v-7a8 8 0 018-8 8 8 0 018 8v7" />
          </svg>
        </button>
      }
    >
      {/* Header with Logo */}
      <div className="mb-8 pt-4 pl-4">
        <div className="flex items-center justify-between mb-6">
          <div className="mr-6">
            <SkillSwapLogo size="lg" href="/" />
          </div>
          <div className="text-center flex-1 pr-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Mobile Prototype Demo</h1>
            <p className="text-gray-600">Interactive skill-sharing interface showcase</p>
          </div>
        </div>
        
        {/* Search Bar */}
        {activeTab === 'explore' && (
          <div className="px-4 mb-4">
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search skills, people, or topics..."
            />
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="pb-20">
        {renderTabContent()}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => console.log('Start new swap')}
        label="Start Swap"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
      />
    </MobileLayout>
  )
}
