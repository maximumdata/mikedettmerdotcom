const router = require('express').Router()
const utils = require('../config/utils')
const Post = require.main.require('../models/post')

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'test', tagline: 'Oh boy can\'t believe it' })
// })

router.get('/', (req, res) => {
  // Post.find({hidden: false}, (err, posts) => {
  //   if (err) throw err
  //   res.render('posts', {title: 'posts', posts: posts})
  // })
  utils.getPostsByPage(0).then((posts) => {
    utils.getTotalNumberOfPages().then((pages) => {
      res.render('posts', {title: `mikedettmer.com`, curPage: 1, pages, posts})
    })
  }).catch((err) => {
    res.render('error', err)
  })
})

router.get('/page/:page', (req, res) => {
  let page = Number(req.params.page)
  if (page === 0 || page === 1) {
    return res.redirect('/')
  }
  utils.getPostsByPage(req.params.page).then((posts) => {
    utils.getTotalNumberOfPages().then((pages) => {
      res.render('posts', {title: `Page ${page} of posts`, curPage: page, pages, posts})
    })
  })
})

router.get('/tag', (req, res) => {
  res.redirect('/')
})

router.get('/tag/:tag', (req, res) => {
  utils.getPostsByPage(0, {tags: req.params.tag}).then((posts) => {
    utils.getTotalNumberOfPages({tags: req.params.tag}).then((pages) => {
      res.render('posts', {title: `tag search for ${req.params.tag}`, curPage: 1, pages, posts, tag: req.params.tag})
    })
  })
})

router.get('/tag/:tag/:page', (req, res) => {
  let page = Number(req.params.page)
  if (page === 0 || page === 1) {
    return res.redirect(`/tag/${req.params.tag}`)
  }
  utils.getPostsByPage(page, { tags: req.params.tag }).then((posts) => {
    utils.getTotalNumberOfPages({tags: req.params.tag}).then((pages) => {
      res.render('posts', {title: `tag search for ${req.params.tag} page ${page}`, curPage: page, pages, posts, tag: req.params.tag})
    })
  })
})

router.get('/list', (req, res) => {
  Post.find({}, null, {sort: '-id'}, (err, posts) => {
    if (err) throw err
    res.json(posts)
  })
})

router.get('/list/:page', (req, res) => {
  utils.getPostsByPage(req.params.page).then((posts) => {
    res.json(posts)
  }).catch((err) => {
    res.render('error', err)
  })
})

router.get('/length', (req, res) => {
  utils.getTotalNumberOfPosts().then((count) => {
    res.send(`count is ${count}`)
  }).catch((err) => {
    throw err
  })
})

router.get('/str/', (req, res) => {
  res.send(utils.stringFromDate(Date.now))
})

module.exports = router
