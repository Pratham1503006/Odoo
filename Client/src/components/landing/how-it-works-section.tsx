'use client'

import { UserPlusIcon, MagnifyingGlassIcon, ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { Section, SectionHeader, SectionGrid } from '../ui/section'
import { FeatureCard } from '../ui/card'
import { AnimatedContainer, AnimatedItem } from '../ui/animated-section'

const steps = [
  {
    id: 1,
    title: 'Create Your Profile',
    description: 'Sign up in 30 seconds with Google or GitHub. Add your skills and what you want to learn.',
    icon: UserPlusIcon,
    color: 'blue',
    features: ['Social login', 'Skill tags', 'Availability settings']
  },
  {
    id: 2,
    title: 'Discover Matches',
    description: 'Our AI finds perfect skill partners based on compatibility, location, and preferences.',
    icon: MagnifyingGlassIcon,
    color: 'purple',
    features: ['AI-powered matching', 'Skill compatibility', 'Location-based']
  },
  {
    id: 3,
    title: 'Start Swapping',
    description: 'Send a swap request, chat instantly, and schedule your skill exchange sessions.',
    icon: ChatBubbleLeftRightIcon,
    color: 'green',
    features: ['Instant messaging', 'Schedule coordination', 'Progress tracking']
  },
  {
    id: 4,
    title: 'Rate & Grow',
    description: 'Complete your swap, leave feedback, and watch your skill network grow organically.',
    icon: StarIcon,
    color: 'orange',
    features: ['Rating system', 'Network growth', 'Skill verification']
  }
]

const colorVariants = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-200',
    number: 'bg-blue-600'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    border: 'border-purple-200',
    number: 'bg-purple-600'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    border: 'border-green-200',
    number: 'bg-green-600'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    border: 'border-orange-200',
    number: 'bg-orange-600'
  }
}

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" background="white" padding="xl">
      <SectionHeader
        title="How SkillSwap Works"
        description="Getting started is incredibly simple. Our streamlined process gets you connected with skill partners in minutes, not hours."
      />

      <SectionGrid columns={4} gap="lg">
        <AnimatedContainer staggerChildren={0.1}>
          {steps.map((step, index) => (
            <AnimatedItem key={step.id}>
              <div className="relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -translate-y-1/2 z-0" />
                )}

                <div className="relative rounded-2xl bg-white border-2 border-gray-200 p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  {/* Step number */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-lg mb-6">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <step.icon className="h-8 w-8 text-primary-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      </SectionGrid>

      {/* CTA */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white shadow-lg">
          <div className="text-sm font-medium">
            Average time to first connection: <span className="font-bold">Under 5 minutes</span>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>
    </Section>
  )
}
