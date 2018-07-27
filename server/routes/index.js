import express from 'express';
import Entries from '../controller/Entries';

const router = express.Router();

router.get('/v1/entries', Entries.getAll);

router.post('/v1/entries', Entries.create);
router.get('/v1/entries/:id', Entries.getOne);
router.put('/v1/entries/:id', Entries.update);

router.post('v1/auth/signup');

export default router;
