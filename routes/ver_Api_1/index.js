import express from 'express';

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).send('version one ok');
});
router.get('/index', (req, res) => {
    res.render('index');
});
router.get('/signin', (req, res) => {
    res.render('signin');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});
router.get('/profile', (req, res) => {
    res.render('profile');
});
export default router;