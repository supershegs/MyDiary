import express from 'express';
import Entries from '../controller/Entries';

const router = express.Router();

router.get('/v1/send', (req, res) => {
    res.send('hello');
});


router.get('/v1/entries', Entries.getAll);

router.post('/v1/entries', Entries.create);
router.get('/v1/entries/:id', Entries.getOne);
router.put('/v1/entries/:id', Entries.update);
router.delete('/v1/entries/:id', Entries.delete);

export default router;
