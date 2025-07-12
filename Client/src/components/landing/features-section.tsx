'use client'

import { motion } from 'framer-motion'
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
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Everything you need for successful skill exchanges
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            From intelligent matching to secure communication, we've built every feature 
            with one goal: making skill sharing effortless and enjoyable.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-200 h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className="relative">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to experience the future of skill sharing?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of learners who are already expanding their skills through meaningful connections.
            </p>
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
              Get Started Free
              <SparklesIcon className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
