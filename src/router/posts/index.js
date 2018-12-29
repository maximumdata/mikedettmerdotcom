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

router.get('/', getAllPublishedPosts);
router.post('/', createNewPost);

// specific post routes
// router.use('/:id', addPostToReq);
router.get('/:id', addPostToReq, getSinglePost);
router.delete('/:id', addPostToReq, deletePost);
router.patch('/:id', addPostToReq, updatePost);

// paginated routes
router.use('/page/:page', getPostsByPage);

export default router;
