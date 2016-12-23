const router = require('express').Router()
// const Account = require.main.require('../models/account')
const slug = require('slug')
const utils = require('../config/utils')
const Post = require.main.require('../models/post')

router.get('/', utils.isAuthenticated, (req, res) => {
  res.render('admin/index', {bodyClass: 'admin'})
})

router.post('/create', utils.isAuthenticated, (req, res) => {
  let id = null

  utils.getTotalNumberOfPosts().then((count) => {
    id = count + 1
    let body = req.body
    let newPost = new Post({
      id: id,
      title: `${body.title}`,
      slug: slug(body.title),
      content: body.content,
      desc: body.desc,
      created: new Date(Date.now()),
      createdStr: utils.stringFromDate(Date.now()),
      // categories: utils.arrayFromCSV(body.categories),
      categories: [],
      tags: utils.arrayFromCSV(body.tags)
    })

    newPost.save((err, saved) => {
      if (err) {
        if (err.code === 11000) {
          res.status(500).json(utils.jsonError('That slug is already in use', err))
        } else { res.json(utils.jsonError('Post not saved', {})); throw err }
      }
      res.json(saved)
    })
  }).catch((err) => {
    res.json(utils.jsonError('Post not saved due to unspecified error', err))
  })
})

// router.get('/delete', utils.isAuthenticated, (req, res) => {
//   Post.remove({}, (err) => {
//     if (err) { throw err }
//     res.send('deleted')
//   })
// })

router.get('/post/', utils.isAuthenticated, (req, res) => {
  res.render('admin/createPost', {bodyClass: 'admin'})
})

router.get('/edit', utils.isAuthenticated, (req, res) => {
  utils.getAllPosts().then((posts) => {
    res.render('admin/editList', { bodyClass: 'admin', posts })
  }).catch((err) => {
    res.json(utils.jsonError('here is the error', err))
  })
})

router.get('/edit/:id', utils.isAuthenticated, (req, res) => {
  utils.getPostById(req.params.id).then((post) => {
    res.render('admin/editPost', { bodyClass: 'admin', post })
  }).catch((err) => {
    res.json(utils.jsonError('error', err))
  })
})

router.post('/edit/:id', utils.isAuthenticated, (req, res) => {
  utils.updatePostById(req.params.id, req.body).then((post) => {
    res.redirect('/admin/edit')
  }).catch((err) => {
    res.json(err)
  })
})

// router.get('/register', function (req, res) {
//   res.render('register', {bodyClass: 'admin'})
// })
//
// router.post('/register', function (req, res, next) {
//   console.log('registering user')
//   Account.register(new Account({username: req.body.username}), req.body.password, function (err) {
//     if (err) {
//       console.log('error while user register!', err)
//       return next(err)
//     }
//
//     console.log('user registered!')
//
//     res.redirect('/')
//   })
// })

module.exports = router
