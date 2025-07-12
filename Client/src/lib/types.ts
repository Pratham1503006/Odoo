// Base Types
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// User Types
export interface User extends BaseEntity {
  email: string
  name: string
  avatar?: string
  bio?: string
  location?: string
  timezone?: string
  isVerified: boolean
  skillsOffered: Skill[]
  skillsWanted: Skill[]
  connections: Connection[]
  rating: number
  totalSwaps: number
}

export interface UserProfile extends Omit<User, 'email'> {
  socialLinks?: SocialLink[]
  availability: Availability
  preferences: UserPreferences
}

// Skill Types
export interface Skill extends BaseEntity {
  name: string
  category: string
  level: SkillLevel
  description?: string
  tags: string[]
  isVerified: boolean
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface SkillMatch {
  user: User
  skill: Skill
  compatibility: number
  distance?: number
}

// Connection Types
export interface Connection extends BaseEntity {
  requester: User
  recipient: User
  status: ConnectionStatus
  skillOffered: Skill
  skillWanted: Skill
  message?: string
  meetingPreference: MeetingType
  timeCommitment: string
}

export type ConnectionStatus = 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled'
export type MeetingType = 'video' | 'in-person' | 'chat' | 'flexible'

// Message Types
export interface Message extends BaseEntity {
  sender: User
  recipient: User
  content: string
  type: MessageType
  isRead: boolean
  connectionId?: string
}

export type MessageType = 'text' | 'image' | 'file' | 'system'

export interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  connection?: Connection
}

// Notification Types
export interface Notification extends BaseEntity {
  user: User
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  actionUrl?: string
  data?: Record<string, any>
}

export type NotificationType = 
  | 'connection_request'
  | 'connection_accepted'
  | 'connection_declined'
  | 'message_received'
  | 'skill_match'
  | 'system_update'

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: Record<string, any>
}

export interface FormData {
  [key: string]: any
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Search and Filter Types
export interface SearchFilters {
  query?: string
  category?: string
  level?: SkillLevel
  location?: string
  availability?: string
  rating?: number
}

export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
}

// Utility Types
export interface SocialLink {
  platform: string
  url: string
}

export interface Availability {
  timezone: string
  schedule: {
    [key: string]: { start: string; end: string }[]
  }
}

export interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    showEmail: boolean
    showLocation: boolean
    showOnlineStatus: boolean
  }
  matching: {
    maxDistance: number
    preferredMeetingTypes: MeetingType[]
    autoAcceptMatches: boolean
  }
}

// Animation Types
export interface AnimationProps {
  initial?: Record<string, any>
  animate?: Record<string, any>
  exit?: Record<string, any>
  transition?: Record<string, any>
}

// Theme Types
export interface Theme {
  colors: {
    primary: Record<string, string>
    secondary: Record<string, string>
    gray: Record<string, string>
    success: Record<string, string>
    warning: Record<string, string>
    error: Record<string, string>
  }
  fonts: {
    sans: string[]
    display: string[]
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
}

// Event Types
export interface AppEvent {
  type: string
  payload?: any
  timestamp: Date
}

// Route Types
export interface Route {
  path: string
  component: React.ComponentType
  exact?: boolean
  protected?: boolean
}

// State Management Types
export interface AppState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface UIState {
  sidebarOpen: boolean
  modalOpen: boolean
  theme: 'light' | 'dark'
  notifications: Notification[]
}
