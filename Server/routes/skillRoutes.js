import express from 'express';
import { skillOperations } from '../SupabaseClient/operations.js';

const router = express.Router();

// Add offered skill
router.post('/offered', async (req, res) => {
    try {
        const { user_id, skill_name, description, category } = req.body;

        if (!user_id || !skill_name) {
            return res.status(400).json({
                success: false,
                message: 'User ID and skill name are required.'
            });
        }

        const skillData = {
            user_id,
            skill_name,
            description: description || '',
            category: category || 'Other'
        };

        const newSkill = await skillOperations.addOfferedSkill(skillData);

        res.status(201).json({
            success: true,
            message: 'Skill added successfully',
            skill: newSkill
        });

    } catch (error) {
        console.error('Error adding offered skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding skill.'
        });
    }
});

// Add wanted skill
router.post('/wanted', async (req, res) => {
    try {
        const { user_id, skill_name, description, category } = req.body;

        if (!user_id || !skill_name) {
            return res.status(400).json({
                success: false,
                message: 'User ID and skill name are required.'
            });
        }

        const skillData = {
            user_id,
            skill_name,
            description: description || '',
            category: category || 'Other'
        };

        const newSkill = await skillOperations.addWantedSkill(skillData);

        res.status(201).json({
            success: true,
            message: 'Skill added successfully',
            skill: newSkill
        });

    } catch (error) {
        console.error('Error adding wanted skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding skill.'
        });
    }
});

// Get user's offered skills
router.get('/offered/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const skills = await skillOperations.getUserOfferedSkills(userId);

        res.status(200).json({
            success: true,
            skills: skills
        });

    } catch (error) {
        console.error('Error fetching user offered skills:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skills.'
        });
    }
});

// Get user's wanted skills
router.get('/wanted/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const skills = await skillOperations.getUserWantedSkills(userId);

        res.status(200).json({
            success: true,
            skills: skills
        });

    } catch (error) {
        console.error('Error fetching user wanted skills:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skills.'
        });
    }
});

// Get all offered skills
router.get('/offered', async (req, res) => {
    try {
        const skills = await skillOperations.getAllOfferedSkills();

        res.status(200).json({
            success: true,
            skills: skills
        });

    } catch (error) {
        console.error('Error fetching offered skills:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skills.'
        });
    }
});

// Search offered skills
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required.'
            });
        }

        const skills = await skillOperations.searchOfferedSkills(query);

        res.status(200).json({
            success: true,
            skills: skills
        });

    } catch (error) {
        console.error('Error searching skills:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching skills.'
        });
    }
});

// Get skills by category
router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const skills = await skillOperations.getSkillsByCategory(category);

        res.status(200).json({
            success: true,
            skills: skills
        });

    } catch (error) {
        console.error('Error fetching skills by category:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skills.'
        });
    }
});

// Delete offered skill
router.delete('/offered/:skillId', async (req, res) => {
    try {
        const skillId = req.params.skillId;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.'
            });
        }

        await skillOperations.deleteOfferedSkill(skillId, user_id);

        res.status(200).json({
            success: true,
            message: 'Skill deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting offered skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting skill.'
        });
    }
});

// Delete wanted skill
router.delete('/wanted/:skillId', async (req, res) => {
    try {
        const skillId = req.params.skillId;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.'
            });
        }

        await skillOperations.deleteWantedSkill(skillId, user_id);

        res.status(200).json({
            success: true,
            message: 'Skill deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting wanted skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting skill.'
        });
    }
});

export default router;
