import { Router } from 'express';
import {
	createNewPost,
	getSinglePost,
	updatePost,
	deletePost,
	addPostToReq,
	getPostsByPage
} from '../controllers/posts';
import { verifyAuth } from '../controllers/users';

const router = Router();

// default to first page of results when route is requested
router.get('/', getPostsByPage);

// needs auth
router.post('/admin', verifyAuth, createNewPost);
router.delete('/admin/:id', verifyAuth, deletePost);
router.put('/admin/:id', verifyAuth, updatePost);

// specific post routes
router.get('/:slug', addPostToReq, getSinglePost);

export default router;
