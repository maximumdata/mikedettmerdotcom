import { Router } from 'express';
import {
	getAllPublishedPosts,
	createNewPost,
	getSinglePost,
	updatePost,
	deletePost,
	addPostToReq,
	getPostsByPage
} from '../../controllers/posts';

const router = Router();

// probably not needed anymore
router.get('/', getPostsByPage);

// needs auth
router.post('/', createNewPost);
router.delete('/:id', addPostToReq, deletePost);
router.patch('/:id', addPostToReq, updatePost);

// specific post routes
router.get('/:id', addPostToReq, getSinglePost);

// paginated routes
// router.use('/page/:page', getPostsByPage);

export default router;
