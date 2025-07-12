// Global type definitions for the Skill Swap Platform

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  bio?: string
  location?: string
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  rating: number
  totalSwaps: number
  skillsOffered: Skill[]
  skillsWanted: Skill[]
  availability: Availability
  preferences: UserPreferences
}

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: SkillLevel
  description?: string
  tags: string[]
  verified: boolean
}

export interface SkillCategory {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface Availability {
  timezone: string
  weekdays: boolean
  evenings: boolean
  weekends: boolean
  preferredTimes: string[]
}

export interface UserPreferences {
  communicationStyle: 'formal' | 'casual'
  sessionLength: 'short' | 'medium' | 'long'
  learningPace: 'slow' | 'normal' | 'fast'
  publicProfile: boolean
  showEmail: boolean
  allowMessages: boolean
}

export interface SwapRequest {
  id: string
  fromUserId: string
  toUserId: string
  offeredSkillId: string
  requestedSkillId: string
  message: string
  status: SwapStatus
  proposedTimes: Date[]
  createdAt: Date
  updatedAt: Date
}

export enum SwapStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  type: 'text' | 'image' | 'file' | 'swap_request'
  timestamp: Date
  read: boolean
  swapRequestId?: string
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: Message
  lastActivity: Date
  unreadCount: number
}

export interface Rating {
  id: string
  fromUserId: string
  toUserId: string
  swapRequestId: string
  rating: number
  feedback: string
  categories: {
    communication: number
    knowledge: number
    punctuality: number
    overall: number
  }
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  actionUrl?: string
  data?: Record<string, any>
  createdAt: Date
}

export enum NotificationType {
  SWAP_REQUEST = 'swap_request',
  SWAP_ACCEPTED = 'swap_accepted',
  SWAP_DECLINED = 'swap_declined',
  MESSAGE = 'message',
  RATING = 'rating',
  SYSTEM = 'system'
}

export interface MatchSuggestion {
  user: User
  compatibility: number
  matchedSkills: {
    offered: Skill[]
    wanted: Skill[]
  }
  commonInterests: string[]
  distance?: number
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  name: string
  acceptTerms: boolean
}

export interface ProfileSetupForm {
  bio: string
  location: string
  avatar?: File
  skillsOffered: string[]
  skillsWanted: string[]
  availability: Availability
  preferences: UserPreferences
}

export interface SwapRequestForm {
  toUserId: string
  offeredSkillId: string
  requestedSkillId: string
  message: string
  proposedTimes: Date[]
}

// Socket Events
export interface SocketEvents {
  // Client to Server
  'join_room': (roomId: string) => void
  'leave_room': (roomId: string) => void
  'send_message': (message: Omit<Message, 'id' | 'timestamp'>) => void
  'typing_start': (conversationId: string) => void
  'typing_stop': (conversationId: string) => void
  
  // Server to Client
  'message_received': (message: Message) => void
  'user_typing': (data: { userId: string; conversationId: string }) => void
  'user_stopped_typing': (data: { userId: string; conversationId: string }) => void
  'swap_request_update': (swapRequest: SwapRequest) => void
  'notification': (notification: Notification) => void
  'user_online': (userId: string) => void
  'user_offline': (userId: string) => void
}

// Store Types
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

export interface ChatState {
  conversations: Conversation[]
  activeConversation: string | null
  messages: Record<string, Message[]>
  isTyping: Record<string, string[]>
  sendMessage: (conversationId: string, content: string) => void
  markAsRead: (conversationId: string, messageId: string) => void
}

export interface SwapState {
  requests: SwapRequest[]
  matches: MatchSuggestion[]
  isLoading: boolean
  sendRequest: (data: SwapRequestForm) => Promise<void>
  acceptRequest: (requestId: string) => Promise<void>
  declineRequest: (requestId: string) => Promise<void>
  getMatches: () => Promise<void>
}
