import { Suspense } from 'react'
import { HeroSection } from '../components/landing/hero-section'
import { FeaturesSection } from '../components/landing/features-section'
import { HowItWorksSection } from '../components/landing/how-it-works-section'
import { TestimonialsSection } from '../components/landing/testimonials-section'
import { CTASection } from '../components/landing/cta-section'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { Loading } from '../components/ui/loading'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-warm-200">
      <Header />
      <Suspense fallback={<Loading />}>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </Suspense>
      <Footer />
    </div>
  )
}
