import { Router } from 'express';
import {
	registerUser,
	loginUser
} from '../controllers/users';

const router = Router();

router.post('/', registerUser);
router.post('/login', loginUser);

export default router;
