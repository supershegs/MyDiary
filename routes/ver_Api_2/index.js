import express from 'express';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.status(202).send('version two ok');
});
router.get('/user', (req, res) => {
    res.send('version two user');
});

export default router;