let router = require('express').Router(),
    passport = require('passport'),
    Post = require.main.require('./models/blogPosts.js');

router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if(err) { res.send(err); }
    if(posts) {
      res.json(posts);
    } else {
      res.status(500).send({success: false, msg: 'No posts available'});
    }
  });
});

router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  let newPost = new Post(handleIncomingPost(req.body));
  newPost.save((err, post) => {
    if(err) {
      return res.status(500).send({ success: false, msg: 'Malformed data received, check err property for details', err: err});
    } else {
      return res.status(200).send({ success: true, msg: 'Successfully saved blog with id: ' + post._id, id: post._id });
    }
  });
});

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.body.id) { return res.send(500).status({ success: false, msg: 'No ID supplied' }); }
  Post.findByIdAndRemove(req.body.id, (err, post) => {
    if (err) { return res.status(500).send({ success: false, msg: 'Unknown error occured, check err property for details', err: err }); }
    if (post) {
      return res.send({ success: true, msg: 'Post with ID ' + req.body.id + ' removed', id: req.body.id });
    } else {
      return res.status(500).send({success: false, msg: 'No matching post with the supplied ID of: ' + req.body.id, id: req.body.id });
    }
  });

});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(handleIncomingPost(req.body));
});

let handleIncomingPost = (body) => {
  if (body.categories) { body.categories = body.categories.split(/[ ,]+/).filter(Boolean); } else { body.categories = []; }
  if (body.tags) { body.tags = body.tags.split(/[ ,]+/).filter(Boolean); } else { body.tags = []; }
  return body;
}

module.exports = router;
