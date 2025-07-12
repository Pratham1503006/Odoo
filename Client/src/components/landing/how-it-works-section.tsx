'use client'

import { motion } from 'framer-motion'
import { UserPlusIcon, MagnifyingGlassIcon, ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/react/24/outline'

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
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            How SkillSwap Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Getting started is incredibly simple. Our streamlined process gets you 
            connected with skill partners in minutes, not hours.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const colors = colorVariants[step.color as keyof typeof colorVariants]
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -translate-y-1/2 z-0" />
                  )}
                  
                  <div className={`relative rounded-2xl ${colors.bg} ${colors.border} border-2 p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                    {/* Step number */}
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${colors.number} text-white font-bold text-lg mb-6`}>
                      {step.id}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-6">
                      <step.icon className={`h-8 w-8 ${colors.icon}`} />
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
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.number} mr-3 flex-shrink-0`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white shadow-lg">
            <div className="text-sm font-medium">
              Average time to first connection: <span className="font-bold">Under 5 minutes</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
