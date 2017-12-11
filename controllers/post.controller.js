const Post = require('../models/post')
const cuid = require('cuid')
const slug = require('limax')
const sanitize = require('sanitize-html')

const PostController = {}

PostController.getAll = async (req, res) => {
  try {
    await Post.find().sort('-dateAdded').exec((err, posts) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({
        posts
      })
    })
  } catch (err) {
    res.send(err)
  }
}

PostController.getPost = async (req, res) => {
  try {
    await Post.findOne({
      cuid: req.params.cuid
    }).exec((err, post) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({
        post
      })
    })
  } catch (err) {
    res.send(err)
  }
}

PostController.addPost = async (req, res) => {
  try {
    if (!req.body.post.title || !req.body.post.content) {
      res.status(403).end()
    }
    const newPost = new Post(req.body.post)
    // sanitize inputs
    newPost.title = sanitize(newPost.title);
    newPost.content = sanitize(newPost.content);

    newPost.slug = slug(newPost.title.toLowerCase(), {
      lowercase: true
    });
    newPost.cuid = cuid();

    await newPost.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          post: saved
        })
      }
    });
  } catch (err) {
    console.log(err);
  }
}

PostController.updatePost = async (req, res) => {
  try {
    if (!req.body.post.title || !req.body.post.content) {
      return res.status(403).end();
    }
    await Post.findOne({
      cuid: req.params.cuid
    }).exec((err, post) => {
      // Handle database errors
      if (err) {
        return res.status(500).send(err);
      }
      if (post) {
        post.title = req.body.post.title || post.title;
        post.content = req.body.post.content || post.content;
        console.log('Post about to be saved');
        // Save
        post.save((err, saved) => {
          if (err) {
            return res.status(500).send(err)
          }
          return res.json({
            post: saved
          });
        });
      } else { return res.status(404).end(); }
    });
  } catch (err) {
    console.log(err);
  }
}

PostController.deletePost = async (req, res) => {
  try {
    await Post.findOne({
      cuid: req.params.cuid
    }).exec((err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      if (post) {
        post.remove(() => {
          res.status(200).end();
        });
      } else {
        res.status(404).end();
      }
    });
  } catch (err) {
    console.log(err);
  }
}

PostController.getPostBySlug = async (req, res) => {
  try {
    await Post.findOne({
      slug: req.params.slug
    }).exec((err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      if (post) {
        req.params.cuid = post.cuid;
        PostController.getPost(req, res);
      } else {
        res.json({ post });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = PostController;
