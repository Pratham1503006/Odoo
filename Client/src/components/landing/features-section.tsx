'use client'

import {
  SparklesIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  GlobeAltIcon,
  UserGroupIcon,
  LightBulbIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { Section, SectionHeader, SectionGrid } from '../ui/section'
import { FeatureCard } from '../ui/card'
import { AnimatedContainer, AnimatedItem } from '../ui/animated-section'

const features = [
  {
    name: 'AI-Powered Matching',
    description: 'Our intelligent algorithm finds the perfect skill partners based on compatibility, learning style, and availability.',
    icon: SparklesIcon,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    name: 'Secure & Private',
    description: 'End-to-end encryption, verified profiles, and granular privacy controls keep your information safe.',
    icon: ShieldCheckIcon,
    gradient: 'from-green-500 to-teal-600'
  },
  {
    name: 'Instant Messaging',
    description: 'Real-time chat with file sharing, video calls, and seamless swap request negotiation built-in.',
    icon: ChatBubbleLeftRightIcon,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Flexible Scheduling',
    description: 'Smart scheduling that adapts to your timezone and availability preferences for stress-free coordination.',
    icon: ClockIcon,
    gradient: 'from-orange-500 to-red-600'
  },
  {
    name: 'Global Community',
    description: 'Connect with skill partners worldwide or find local experts in your area for in-person exchanges.',
    icon: GlobeAltIcon,
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    name: 'Verified Skills',
    description: 'Community-driven skill verification and rating system ensures quality and builds trust.',
    icon: UserGroupIcon,
    gradient: 'from-teal-500 to-green-600'
  },
  {
    name: 'Smart Recommendations',
    description: 'Get personalized skill suggestions based on your interests, career goals, and learning history.',
    icon: LightBulbIcon,
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    name: 'Quality Assurance',
    description: 'Built-in rating system and feedback mechanism ensure high-quality skill exchanges every time.',
    icon: StarIcon,
    gradient: 'from-pink-500 to-purple-600'
  },
]

export function FeaturesSection() {
  return (
    <Section background="gray" padding="xl">
      <SectionHeader
        title="Everything you need for successful skill exchanges"
        description="From intelligent matching to secure communication, we've built every feature with one goal: making skill sharing effortless and enjoyable."
      />

      <SectionGrid columns={4} gap="lg">
        <AnimatedContainer staggerChildren={0.1}>
          {features.map((feature) => (
            <AnimatedItem key={feature.name}>
              <FeatureCard
                title={feature.name}
                description={feature.description}
                icon={<feature.icon className="h-6 w-6" />}
                animated={true}
              />
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      </SectionGrid>

    </Section>
  )
}
