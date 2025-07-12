import supabase from './client.js';

// User operations using Supabase
export const userOperations = {
    // Create user profile
    async createUser(userData) {
        const { data, error } = await supabase
            .from('users')
            .insert([{
                id: new Date().toISOString(), // Using timestamp as ID as per your schema
                username: userData.username,
                email: userData.email,
                avatar: userData.avatar || null,
                location: userData.location || null,
                password: userData.password, // Note: In production, this should be hashed
                availability: userData.availability || 'available'
            }])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },
    
    // Get user by email
    async getUserByEmail(email) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        
        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
        return data;
    },
    
    // Get user by ID
    async getUserById(id) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },
    
    // Update user profile
    async updateUser(id, updates) {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },
    
    // Get all users (for browsing)
    async getAllUsers() {
        const { data, error } = await supabase
            .from('users')
            .select('id, username, email, location, avatar, availability');
        
        if (error) throw error;
        return data || [];
    },

    // Authenticate user (simple password check)
    async authenticateUser(email, password) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password) // Note: In production, use proper password hashing
            .single();
        
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    }
};

// Skills operations using Supabase
export const skillOperations = {
    // Add offered skill
    async addOfferedSkill(skillData) {
        const { data, error } = await supabase
            .from('skill_offered')
            .insert([{
                user_id: skillData.user_id,
                skills: skillData.skills
            }])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },
    
    // Add wanted skill
    async addWantedSkill(skillData) {
        const { data, error } = await supabase
            .from('skillss_wanted') // Note: using your table name with double 's'
            .insert([{
                user_id: skillData.user_id,
                skill_name: skillData.skill_name
            }])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },
    
    // Get user's offered skills
    async getUserOfferedSkills(userId) {
        const { data, error } = await supabase
            .from('skill_offered')
            .select('*')
            .eq('user_id', userId);
        
        if (error) throw error;
        return data || [];
    },
    
    // Get user's wanted skills
    async getUserWantedSkills(userId) {
        const { data, error } = await supabase
            .from('skillss_wanted')
            .select('*')
            .eq('user_id', userId);
        
        if (error) throw error;
        return data || [];
    },
    
    // Get all offered skills with user info
    async getAllOfferedSkills() {
        const { data, error } = await supabase
            .from('skill_offered')
            .select(`
                *,
                users (
                    username,
                    email,
                    location,
                    avatar,
                    availability
                )
            `)
            .order('id', { ascending: false });
        
        if (error) throw error;
        return data || [];
    },
    
    // Get all wanted skills with user info
    async getAllWantedSkills() {
        const { data, error } = await supabase
            .from('skillss_wanted')
            .select(`
                *,
                users (
                    username,
                    email,
                    location,
                    avatar,
                    availability
                )
            `)
            .order('id', { ascending: false });
        
        if (error) throw error;
        return data || [];
    },
    
    // Search offered skills
    async searchOfferedSkills(searchTerm) {
        const { data, error } = await supabase
            .from('skill_offered')
            .select(`
                *,
                users (
                    username,
                    email,
                    location,
                    avatar,
                    availability
                )
            `)
            .ilike('skills', `%${searchTerm}%`);
        
        if (error) throw error;
        return data || [];
    },
    
    // Search wanted skills
    async searchWantedSkills(searchTerm) {
        const { data, error } = await supabase
            .from('skillss_wanted')
            .select(`
                *,
                users (
                    username,
                    email,
                    location,
                    avatar,
                    availability
                )
            `)
            .ilike('skill_name', `%${searchTerm}%`);
        
        if (error) throw error;
        return data || [];
    },
    
    // Delete offered skill
    async deleteOfferedSkill(skillId, userId) {
        const { error } = await supabase
            .from('skill_offered')
            .delete()
            .eq('id', skillId)
            .eq('user_id', userId);
        
        if (error) throw error;
        return true;
    },
    
    // Delete wanted skill
    async deleteWantedSkill(skillId, userId) {
        const { error } = await supabase
            .from('skillss_wanted')
            .delete()
            .eq('id', skillId)
            .eq('user_id', userId);
        
        if (error) throw error;
        return true;
    }
};

// Swap operations (placeholder for now since no swap table in your schema)
export const swapOperations = {
    // Create swap request (placeholder)
    async createSwapRequest(swapData) {
        // Since you don't have a swap_requests table, return a mock response
        return {
            id: Date.now(),
            ...swapData,
            status: 'pending',
            created_at: new Date().toISOString()
        };
    },

    // Get user's swap requests (placeholder)
    async getUserSwapRequests(userId) {
        // Return empty array since no swap table exists
        return [];
    },

    // Update swap request status (placeholder)
    async updateSwapStatus(swapId, status) {
        // Return mock response
        return {
            id: swapId,
            status: status,
            updated_at: new Date().toISOString()
        };
    }
};
