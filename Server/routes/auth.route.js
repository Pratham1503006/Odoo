import express from 'express';
import { userOperations } from '../SupabaseClient/operations.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, location } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, and password are required.'
            });
        }

        // Check if user already exists
        const existingUser = await userOperations.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists with this email.'
            });
        }

        // Create user in database
        const newUser = await userOperations.createUser({
            username,
            email,
            password, // Note: In production, hash this password
            location: location || '',
            availability: 'available'
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                location: newUser.location,
                availability: newUser.availability
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Registration failed'
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.'
            });
        }

        // Authenticate user with simple password check
        const user = await userOperations.authenticateUser(email, password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                location: user.location,
                avatar: user.avatar,
                availability: user.availability
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

// Get current user by ID
router.get('/me/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const userProfile = await userOperations.getUserById(userId);

        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: 'User profile not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: userProfile.id,
                username: userProfile.username,
                email: userProfile.email,
                location: userProfile.location,
                avatar: userProfile.avatar,
                availability: userProfile.availability
            }
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile'
        });
    }
});

// Simple logout (client-side session clearing)
router.post('/logout', async (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

export default router;