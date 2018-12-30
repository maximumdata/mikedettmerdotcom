import { Router } from 'express';
import {
	registerUser,
	getUserIdFromToken,
	getUserFromId,
	loginUser
} from '../controllers/users';

const router = Router();

router.get('/me', getUserIdFromToken, getUserFromId);
router.post('/', registerUser);
router.post('/login', loginUser);

export default router;
