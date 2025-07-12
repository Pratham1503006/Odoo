import express from 'express';
const router = express.Router();

router.get('/auth', (req, res) => {
    res.json({ message: 'Auth route is working!' });
});

export default router;