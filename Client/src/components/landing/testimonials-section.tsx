'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

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
            Loved by skill enthusiasts worldwide
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Real stories from real people who've transformed their skills through our platform.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-8 h-full transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 border border-gray-100">
                {/* Quote content */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                </div>

                {/* Skills exchanged */}
                <div className="mb-6 space-y-3">
                  <div>
                    <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Taught</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {testimonial.skills.map((skill) => (
                        <span key={skill} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Learned</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {testimonial.learned.map((skill) => (
                        <span key={skill} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-blue-100">Average rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-blue-100">Successful swaps</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2.5 days</div>
                <div className="text-blue-100">Average match time</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
