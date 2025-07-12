import express from 'express';
import { swapOperations } from '../SupabaseClient/operations.js';

const router = express.Router();

// Create swap request
router.post('/', async (req, res) => {
    try {
        const { requester_id, receiver_id, offered_skill_id, wanted_skill_id, message } = req.body;

        if (!requester_id || !receiver_id || !offered_skill_id || !wanted_skill_id) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided.'
            });
        }

        const swapData = {
            requester_id,
            receiver_id,
            offered_skill_id,
            wanted_skill_id,
            message: message || '',
            status: 'pending',
            created_at: new Date().toISOString()
        };

        const newSwap = await swapOperations.createSwapRequest(swapData);

        res.status(201).json({
            success: true,
            message: 'Swap request created successfully',
            swap: newSwap
        });

    } catch (error) {
        console.error('Error creating swap request:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating swap request.'
        });
    }
});

// Get user's swap requests
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const swaps = await swapOperations.getUserSwapRequests(userId);

        res.status(200).json({
            success: true,
            swaps: swaps
        });

    } catch (error) {
        console.error('Error fetching swap requests:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching swap requests.'
        });
    }
});

// Update swap request status
router.put('/:swapId/status', async (req, res) => {
    try {
        const swapId = req.params.swapId;
        const { status, user_id } = req.body;

        if (!status || !user_id) {
            return res.status(400).json({
                success: false,
                message: 'Status and user ID are required.'
            });
        }

        if (!['accepted', 'declined', 'completed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be accepted, declined, or completed.'
            });
        }

        const updatedSwap = await swapOperations.updateSwapStatus(swapId, status, user_id);

        res.status(200).json({
            success: true,
            message: 'Swap status updated successfully',
            swap: updatedSwap
        });

    } catch (error) {
        console.error('Error updating swap status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating swap status.'
        });
    }
});

export default router;