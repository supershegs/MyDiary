import router from './index';
import userRoute from '../controller/users';

router.post('/v1/auth/signup', userRoute.createUser);
router.post('/v1/auth/login', (req, res) => {
  res.status(200).send('login');
});

export default router;
