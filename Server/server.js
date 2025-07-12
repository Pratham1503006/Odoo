import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import database connection to initialize it
import supabase from './SupabaseClient/client.js';

// Import route modules
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/userRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import swapRoutes from './routes/swap.route.js';
import adminRoutes from './routes/admin.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'Skill Swap Platform Server is working!',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/auth', authRoutes);      // Login, register, logout
app.use('/api/users', userRoutes);     // User profile management
app.use('/api/skills', skillRoutes);   // Skills offered/wanted
app.use('/api/swaps', swapRoutes);     // Swap requests
app.use('/api/admin', adminRoutes);    // Admin panel

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found', requestedUrl: req.originalUrl });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Skill Swap Platform Server running at http://localhost:${PORT}`);
    console.log('🚀 Server ready to facilitate skill exchanges!');
});