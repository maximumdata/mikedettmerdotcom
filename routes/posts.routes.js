const Router = require('express').Router;
const PostController = require('../controllers/post.controller');
const router = new Router();

router.get('/posts', (req, res) => {
  PostController.getAll(req, res);
});

router.get('/posts/:cuid', (req, res) => {
  PostController.getPost(req, res);
});

router.post('/posts', (req, res) => {
  PostController.addPost(req, res);
});

router.put('/posts/:cuid', (req, res) => {
  PostController.updatePost(req, res);
});

router.delete('/posts/:cuid', (req, res) => {
  PostController.deletePost(req, res);
});

router.get('/posts/slug/:slug', (req, res) => {
  PostController.getPostBySlug(req, res);
});
module.exports = router;
