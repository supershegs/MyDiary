import router from './index';
import userRoute from '../controller/users';

router.post('/signup', userRoute.createUser);
router.post('/login', userRoute.authUser);

export default router;
