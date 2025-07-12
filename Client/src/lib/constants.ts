// App Configuration
export const APP_CONFIG = {
  name: 'SkillSwap',
  description: 'Exchange skills, build connections',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  retries: 3,
} as const

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
  },
  easing: {
    easeOut: [0.0, 0.0, 0.2, 1],
    easeIn: [0.4, 0.0, 1, 1],
    easeInOut: [0.4, 0.0, 0.2, 1],
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
} as const

// Design System Tokens
export const DESIGN_TOKENS = {
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
} as const

// Navigation Links
export const NAVIGATION_LINKS = [
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Explore', href: '/explore' },
] as const

// Social Links
export const SOCIAL_LINKS = [
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'GitHub', href: '#', icon: 'github' },
] as const

// Feature Categories
export const FEATURE_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Design',
  'Data Science',
  'Marketing',
  'Business',
  'Languages',
  'Music',
  'Art',
  'Cooking',
  'Fitness',
  'Photography',
] as const

// Skill Levels
export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
] as const

// Time Commitments
export const TIME_COMMITMENTS = [
  { value: '1-2', label: '1-2 hours/week' },
  { value: '3-5', label: '3-5 hours/week' },
  { value: '6-10', label: '6-10 hours/week' },
  { value: '10+', label: '10+ hours/week' },
] as const

// Meeting Types
export const MEETING_TYPES = [
  { value: 'video', label: 'Video Call' },
  { value: 'in-person', label: 'In Person' },
  { value: 'chat', label: 'Text Chat' },
  { value: 'flexible', label: 'Flexible' },
] as const

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  auth: 'Authentication failed. Please log in again.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  profileUpdated: 'Profile updated successfully!',
  skillAdded: 'Skill added successfully!',
  connectionRequested: 'Connection request sent!',
  messagesSent: 'Message sent successfully!',
} as const

// Validation Rules
export const VALIDATION_RULES = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Name must be less than 50 characters',
    },
  },
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  user: 'skillswap_user',
  token: 'skillswap_token',
  preferences: 'skillswap_preferences',
  theme: 'skillswap_theme',
} as const

// Query Keys for React Query
export const QUERY_KEYS = {
  user: ['user'],
  skills: ['skills'],
  connections: ['connections'],
  messages: ['messages'],
  notifications: ['notifications'],
} as const
