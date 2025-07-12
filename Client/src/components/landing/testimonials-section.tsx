'use client'

import { Section, SectionHeader, SectionGrid } from '../ui/section'
import { TestimonialCard } from '../ui/card'
import { AnimatedContainer, AnimatedItem } from '../ui/animated-section'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'UX Designer',
    avatar: '/avatars/sarah.jpg',
    rating: 5,
    content: "I learned Spanish conversation skills in exchange for teaching Figma. The process was so smooth and natural - like having a coffee chat with a friend!",
    skills: ['Figma', 'Design Systems'],
    learned: ['Spanish', 'Photography']
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Software Developer',
    avatar: '/avatars/marcus.jpg',
    rating: 5,
    content: "SkillSwap connected me with amazing people. I taught React and learned guitar basics. The AI matching is incredibly accurate!",
    skills: ['React', 'Node.js'],
    learned: ['Guitar', 'Music Theory']
  },
  {
    name: 'Emily Johnson',
    role: 'Marketing Manager',
    avatar: '/avatars/emily.jpg',
    rating: 5,
    content: "As someone who's always wanted to learn coding, finding a patient teacher through SkillSwap was a game-changer. I taught social media marketing in return.",
    skills: ['Social Media', 'Content Strategy'],
    learned: ['Python', 'Data Analysis']
  },
  {
    name: 'David Kim',
    role: 'Chef',
    avatar: '/avatars/david.jpg',
    rating: 5,
    content: "I never thought I'd learn graphic design, but SkillSwap made it possible. Taught cooking in exchange for Photoshop skills. Win-win!",
    skills: ['Cooking', 'Recipe Development'],
    learned: ['Photoshop', 'Branding']
  },
  {
    name: 'Anna Kowalski',
    role: 'Financial Analyst',
    avatar: '/avatars/anna.jpg',
    rating: 5,
    content: "The platform is incredibly user-friendly. I've completed 5 skill swaps and made genuine friends along the way. The community is amazing!",
    skills: ['Excel', 'Financial Modeling'],
    learned: ['Web Development', 'SEO']
  },
  {
    name: 'James Thompson',
    role: 'Teacher',
    avatar: '/avatars/james.jpg',
    rating: 5,
    content: "Teaching language skills while learning digital marketing has been transformative for my career. SkillSwap makes peer learning feel natural.",
    skills: ['French', 'Language Teaching'],
    learned: ['Digital Marketing', 'Analytics']
  }
]

export function TestimonialsSection() {
  return (
    <Section background="white" padding="xl">
      <SectionHeader
        title="Loved by skill enthusiasts worldwide"
        description="Real stories from real people who've transformed their skills through our platform."
      />

      <SectionGrid columns={3} gap="lg">
        <AnimatedContainer staggerChildren={0.1}>
          {testimonials.map((testimonial) => (
            <AnimatedItem key={testimonial.name}>
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
                animated={true}
              />
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      </SectionGrid>

    </Section>
  )
}
