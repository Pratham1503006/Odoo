import express from 'express';
const router = express.Router();

router.get('/user', (req, res) => {
    res.json({ message: 'User route is working!' });
});

export default router;