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
router.post('/', verifyAuth, createNewPost);
router.delete('/:id', verifyAuth, addPostToReq, deletePost);
router.patch('/:id', verifyAuth, addPostToReq, updatePost);

// specific post routes
router.get('/:id', addPostToReq, getSinglePost);

export default router;
