import router from './index';
import userRoute from '../controller/users';

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Authictaion is working' });
});

router.post('/signup', userRoute.createUser);
router.post('/login', userRoute.authUser);

export default router;
