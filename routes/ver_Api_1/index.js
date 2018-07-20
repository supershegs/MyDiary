import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('version one ok');
});
router.get('/user', (req, res) => {
    res.send('version one user');
});

export default router;