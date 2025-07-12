import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://faicfimolnietqtlnbss.supabase.co' 
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhaWNmaW1vbG5pZXRxdGxuYnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTM5MTUsImV4cCI6MjA2Nzg4OTkxNX0.Ub7d2T6PZu8cJY0uusiMFBsGWbaKio2pJuxZxhOyf34'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name: string
  location?: string
  avatar?: string
  privacy: 'public' | 'private'
  availability: string
  created_at: string
  updated_at?: string
}

export interface SkillOffered {
  id: string
  user_id: string
  skill_name: string
  description: string
  category: string
  created_at: string
  users?: User
}

export interface SkillWanted {
  id: string
  user_id: string
  skill_name: string
  description: string
  category: string
  created_at: string
  users?: User
}

export interface SwapRequest {
  id: string
  requester_id: string
  receiver_id: string
  offered_skill_id: string
  wanted_skill_id: string
  message: string
  status: 'pending' | 'accepted' | 'declined' | 'completed'
  created_at: string
  updated_at?: string
  requester?: User
  receiver?: User
  offered_skill?: SkillOffered
  wanted_skill?: SkillWanted
}

// Auth helpers
export const authHelpers = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData: { name: string; location?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Get current user
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}

// Database helpers
export const dbHelpers = {
  // User operations
  users: {
    async getById(id: string) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      return { data, error }
    },

    async getByEmail(email: string) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()
      return { data, error }
    },

    async create(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()
      return { data, error }
    },

    async update(id: string, updates: Partial<User>) {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      return { data, error }
    },

    async getPublic() {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, location, avatar, availability, created_at')
        .eq('privacy', 'public')
      return { data, error }
    }
  },

  // Skills operations
  skills: {
    async getOfferedByUser(userId: string) {
      const { data, error } = await supabase
        .from('skill_offered')
        .select('*')
        .eq('user_id', userId)
      return { data, error }
    },

    async getWantedByUser(userId: string) {
      const { data, error } = await supabase
        .from('skills_wanted')
        .select('*')
        .eq('user_id', userId)
      return { data, error }
    },

    async getAllOffered() {
      const { data, error } = await supabase
        .from('skill_offered')
        .select(`
          *,
          users!inner (
            name,
            location,
            avatar,
            privacy
          )
        `)
        .eq('users.privacy', 'public')
        .order('created_at', { ascending: false })
      return { data, error }
    },

    async searchOffered(searchTerm: string) {
      const { data, error } = await supabase
        .from('skill_offered')
        .select(`
          *,
          users!inner (
            name,
            location,
            avatar,
            privacy
          )
        `)
        .eq('users.privacy', 'public')
        .or(`skill_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      return { data, error }
    },

    async getByCategory(category: string) {
      const { data, error } = await supabase
        .from('skill_offered')
        .select(`
          *,
          users!inner (
            name,
            location,
            avatar,
            privacy
          )
        `)
        .eq('users.privacy', 'public')
        .eq('category', category)
      return { data, error }
    },

    async addOffered(skillData: Omit<SkillOffered, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('skill_offered')
        .insert([skillData])
        .select()
        .single()
      return { data, error }
    },

    async addWanted(skillData: Omit<SkillWanted, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('skills_wanted')
        .insert([skillData])
        .select()
        .single()
      return { data, error }
    },

    async deleteOffered(skillId: string, userId: string) {
      const { error } = await supabase
        .from('skill_offered')
        .delete()
        .eq('id', skillId)
        .eq('user_id', userId)
      return { error }
    },

    async deleteWanted(skillId: string, userId: string) {
      const { error } = await supabase
        .from('skills_wanted')
        .delete()
        .eq('id', skillId)
        .eq('user_id', userId)
      return { error }
    }
  },

  // Swap operations
  swaps: {
    async create(swapData: Omit<SwapRequest, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('swap_requests')
        .insert([swapData])
        .select()
        .single()
      return { data, error }
    },

    async getByUser(userId: string) {
      const { data, error } = await supabase
        .from('swap_requests')
        .select(`
          *,
          requester:users!swap_requests_requester_id_fkey (
            id, name, avatar, location
          ),
          receiver:users!swap_requests_receiver_id_fkey (
            id, name, avatar, location
          ),
          offered_skill:skill_offered (
            id, skill_name, category
          ),
          wanted_skill:skills_wanted (
            id, skill_name, category
          )
        `)
        .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    async updateStatus(swapId: string, status: SwapRequest['status'], userId: string) {
      const { data, error } = await supabase
        .from('swap_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', swapId)
        .eq('receiver_id', userId) // Only receiver can update status
        .select()
        .single()
      return { data, error }
    }
  }
}
