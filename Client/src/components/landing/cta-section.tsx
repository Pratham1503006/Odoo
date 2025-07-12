'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-20 text-center shadow-2xl sm:px-16"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto mb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white">
                <SparklesIcon className="h-4 w-4" />
                <span>Join the skill sharing revolution</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Your next skill is just one{' '}
              <span className="text-yellow-300">swap away</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100"
            >
              Don't let another day pass wondering "what if." Join SkillSwap today and start 
              building the skills that will transform your personal and professional life.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                href="/auth/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-200 hover:scale-105"
              >
                Start Your First Swap
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-200"
              >
                Explore Skills
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-center gap-8 text-blue-100"
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Setup in 30 seconds</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Check out our comprehensive FAQ or reach out to our friendly community support team.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View FAQ
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
