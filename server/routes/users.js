import router from './index';
import userRoute from '../controller/users';

router.get('/signup', (req, res) => {
  res.status(200).json({ message: 'sigup get working' });
});

router.post('/signup', userRoute.createUser);
router.post('/login', userRoute.authUser);

export default router;
