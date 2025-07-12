import express from 'express';
const router = express.Router();

router.get('/admin', (req, res) => {
    res.json({ message: 'Admin route is working!' });
});

export default router;