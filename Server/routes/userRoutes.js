import express from 'express';
import { upload, uploadAvatar } from '../services/uploadService.js';
import { userOperations } from '../SupabaseClient/operations.js';

const router = express.Router();

// Upload avatar endpoint
router.post('/upload-avatar/:userId', upload.single('avatar'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ 
                success: false, 
                message: 'No file uploaded.' 
            });
        }

        // Validate user exists
        const user = await userOperations.getUserById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        // Upload avatar
        const result = await uploadAvatar(userId, file);

        res.status(200).json({
            success: true,
            message: 'Avatar uploaded successfully',
            avatarUrl: result.avatarUrl,
            user: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                avatar: result.user.avatar
            }
        });

    } catch (error) {
        console.error('Error uploading avatar:', error);
        
        if (error.message === 'Only image files are allowed!') {
            return res.status(400).json({ 
                success: false, 
                message: 'Only image files are allowed.' 
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Error uploading avatar.' 
        });
    }
});

// Create user
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, location, privacy = 'public', availability = 'available' } = req.body;

        // Basic validation
        if (!email || !password || !name) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email, password, and name are required.' 
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

        // Create user profile (auth should be handled separately)
        const userData = {
            email,
            name,
            location: location || '',
            privacy: privacy || 'public',
            availability: availability || 'available'
        };

        const newUser = await userOperations.createUser(userData);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                location: newUser.location,
                privacy: newUser.privacy,
                availability: newUser.availability
            }
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error creating user.' 
        });
    }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userOperations.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.status(200).json({
            success: true,
            user: user
        });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile.'
        });
    }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, location, privacy, availability, avatar } = req.body;

        const updates = {};
        if (name !== undefined) updates.name = name;
        if (location !== undefined) updates.location = location;
        if (privacy !== undefined) updates.privacy = privacy;
        if (availability !== undefined) updates.availability = availability;
        if (avatar !== undefined) updates.avatar = avatar;

        const updatedUser = await userOperations.updateUser(userId, updates);

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user profile.'
        });
    }
});

// Get all users
router.get('/public', async (req, res) => {
    try {
        const users = await userOperations.getAllUsers();

        res.status(200).json({
            success: true,
            users: users
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users.'
        });
    }
});

export default router;
