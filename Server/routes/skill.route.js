import express from 'express';
const router = express.Router();

router.get('/skill', (req, res) => {
    res.json({ message: 'Skill route is working!' });
});

export default router;