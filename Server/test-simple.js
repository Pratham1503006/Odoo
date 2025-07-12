import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory storage for testing
let users = [];
let skills = [];
let nextUserId = 1;
let nextSkillId = 1;

// Test route
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true,
        message: 'Simple Skill Swap API is working!',
        timestamp: new Date().toISOString()
    });
});

// Register user
app.post('/api/auth/register', (req, res) => {
    try {
        const { username, email, password, location } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Username, email, and password are required.' 
            });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                message: 'User already exists with this email.' 
            });
        }

        // Create user
        const newUser = {
            id: new Date().toISOString(),
            username,
            email,
            password, // Note: In production, hash this password
            location: location || '',
            availability: 'available',
            avatar: null
        };

        users.push(newUser);

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
            message: 'Registration failed' 
        });
    }
});

// Login user
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required.' 
            });
        }

        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        
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

// Get all users
app.get('/api/users/public', (req, res) => {
    try {
        const publicUsers = users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            location: user.location,
            avatar: user.avatar,
            availability: user.availability
        }));
        
        res.status(200).json({
            success: true,
            users: publicUsers
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching users.' 
        });
    }
});

// Add offered skill
app.post('/api/skills/offered', (req, res) => {
    try {
        const { user_id, skills: skillName } = req.body;

        if (!user_id || !skillName) {
            return res.status(400).json({ 
                success: false, 
                message: 'User ID and skill name are required.' 
            });
        }

        const newSkill = {
            id: nextSkillId++,
            user_id,
            skills: skillName
        };

        skills.push(newSkill);

        res.status(201).json({
            success: true,
            message: 'Skill added successfully.',
            skill: newSkill
        });

    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error adding skill.' 
        });
    }
});

// Get all offered skills
app.get('/api/skills/offered', (req, res) => {
    try {
        const skillsWithUsers = skills.map(skill => {
            const user = users.find(u => u.id === skill.user_id);
            return {
                ...skill,
                users: user ? {
                    username: user.username,
                    email: user.email,
                    location: user.location,
                    avatar: user.avatar,
                    availability: user.availability
                } : null
            };
        });
        
        res.status(200).json({
            success: true,
            skills: skillsWithUsers
        });

    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching skills.' 
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Simple Skill Swap Server running at http://localhost:${PORT}`);
    console.log('🚀 Server ready with in-memory storage!');
    console.log('📝 Note: Data will be lost when server restarts');
});
