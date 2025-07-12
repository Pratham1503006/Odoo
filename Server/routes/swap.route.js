import express from 'express';
const router = express.Router();

router.get('/swap', (req, res) => {
    res.json({ message: 'Swap route is working!' });
});

export default router;