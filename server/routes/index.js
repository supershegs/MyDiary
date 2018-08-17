import express from 'express';
import Entries from '../controller/Entries';

const router = express.Router();
router.get('/v1', (req, res) => {
  res.status(200).send('version one is ok');
});
router.get('/v2', (req, res) => {
  res.status(200).send('version two not yet available');
});
// router.get('/v1/entries/diary', Entries.getAll);
router.get('/v1/entries', Entries.getUserEntries);
router.post('/v1/entries', Entries.create);
router.get('/v1/entries/:id', Entries.getOne);
router.put('/v1/entries/:id', Entries.update);
router.delete('/v1/entries/:id', Entries.remove);

export default router;
