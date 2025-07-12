import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

// Test connection
const testConnection = async () => {
    try {
        const { data, error } = await supabase.from('users').select('count').limit(1);
        if (error) {
            console.error('Supabase connection error:', error.message);
        } else {
            console.log('Connected to Supabase database');
        }
    } catch (err) {
        console.error('Supabase connection test failed:', err.message);
    }
};

testConnection();

export default supabase;