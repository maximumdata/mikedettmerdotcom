var express = require('express')
var router = express.Router()
let Post = require.main.require('../models/post')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/posts', (req, res) => {
  Post.find({hidden: false}, (err, posts) => {
    if (err) throw err
    res.render('posts', {title: 'posts', posts: posts})
  })
})

router.get('/create', (req, res) => {
  let newPost = new Post({
    title: '' + Date.now(),
    content: 'String',
    created: Date.now(),
    categories: ['1', '2', '3'],
    tags: ['4', '5', '6']
  })

  newPost.save((err, saved) => {
    if (err) throw err
    res.json(saved)
  })
})

router.get('/list', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) throw err
    res.json(posts)
  })
})
module.exports = router
