import express from 'express';

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).send('version one ok');
});
router.get('/entries', (req, res) => {
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
router.post('/entries', (req, res) => {
    // res.status(200).send(req.body);
    var id = req.body.id;
    var date = req.body.dateTime;
    var list = req.body.story;
    console.log(req.body);
    var entries = [
        {
            entryId: id,
            dateTime: date,
            story: list,
        },
    ];

    res.redirect('/api/v1/entries');
});
router.get('/entries/:id', (req, res) => {
    // res.status(200).send(req.body);
    var id = req.body.id;
    res.redirect('/entries/', id);
});
router.put('/entries/:id', (req, res) => {
    // res.status(200).send(req.body);
    res.redirect('/api/v1/entries');
});

export default router;