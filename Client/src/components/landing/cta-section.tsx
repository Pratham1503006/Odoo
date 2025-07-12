'use client'

import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { Section } from '../ui/section'
import { AnimatedSection } from '../ui/animated-section'
import { LinkButton } from '../ui/button'

export function CTASection() {
  return (
    <Section background="gradient" padding="xl">
      <AnimatedSection>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-20 text-center shadow-2xl sm:px-16">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="mx-auto mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white">
                <SparklesIcon className="h-4 w-4" />
                <span>Join the skill sharing revolution</span>
              </div>
            </div>

            <h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your next skill is just one{' '}
              <span className="text-yellow-300">swap away</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Don't let another day pass wondering "what if." Join SkillSwap today and start
              building the skills that will transform your personal and professional life.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <LinkButton
                href="/auth/signup"
                variant="secondary"
                size="lg"
                animated={true}
                className="bg-white text-blue-600 hover:bg-blue-50 group"
              >
                Start Your First Swap
                <ArrowRightIcon className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </LinkButton>

              <LinkButton
                href="/explore"
                variant="outline"
                size="lg"
                animated={true}
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              >
                Explore Skills
              </LinkButton>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center justify-center gap-8 text-blue-100">
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
            </div>
          </div>
        </div>
      </AnimatedSection>
    </Section>
  )
}
