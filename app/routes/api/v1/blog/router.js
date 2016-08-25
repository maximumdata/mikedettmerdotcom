let router = require('express').Router(),
    Post = require('../../../../models/blogPosts.js');

// router.get('/', (req, res) => {
//   blogPosts.find({}, (err, posts) => {
//     if(err) { res.send(err); }
//     else { res.json(posts); }
//   });
// });
//
// router.get('/add', (req, res) => {
//   let test = {
//     content: 'Oh boy I can\'t believe it',
//     title: 'Test title',
//     categories: ['One', 'Two'],
//     tags: ['1', '2']
//   }
//
//   let newPost = new blogPosts(test);
//
//   newPost.save((err, post) => {
//     if(err) { res.send(err); }
//     else {
//       res.send('success!');
//     }
//   });
// });


router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if(err) { res.send(err); }
    else if(posts) {
      res.json(posts);
    }
  });
});

router.put('/', (req, res) => {
  let body = req.body;
  body.categories = body.categories.split(/[ ,]+/).filter(Boolean);
  body.tags = body.tags.split(/[ ,]+/).filter(Boolean);

  let newPost = new Post(body);
  newPost.save((err, post) => {
    if(err) {
      res.send(err);
    } else {
      res.status(200).end();
    }
  });
});

router.delete('/', (req, res) => {
  res.send(req.body.data);
});

router.post('/', (req, res) => {
  res.send(req.body);
});

module.exports = router;
