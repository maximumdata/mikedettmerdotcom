import { Router } from 'express';
import {
 getAllPublishedPosts, createNewPost, getSinglePost, updatePost, deletePost, addPostToReq
} from '../../controllers/posts';

const router = Router();

router.get('/', getAllPublishedPosts);
router.post('/', createNewPost);

// specific post routes
router.use('/:id', addPostToReq);
router.get('/:id', getSinglePost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);

export default router;
