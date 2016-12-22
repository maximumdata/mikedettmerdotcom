const router = require('express').Router()
const utils = require('../config/utils')
const passport = require('passport')

router.get('/', (req, res) => {
  utils.getPostsByPage(0).then((posts) => {
    utils.getTotalNumberOfPages().then((pages) => {
      res.render('posts', {bodyClass: 'index', title: `mikedettmer.com`, curPage: 1, pages, posts})
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
      let str = `Page ${page} of all posts`
      res.render('posts', {bodyClass: 'index', title: str, tagline: str, curPage: page, pages, posts})
    })
  })
})

router.get('/tag', (req, res) => {
  res.redirect('/')
})

router.get('/tag/:tag', (req, res) => {
  utils.getPostsByPage(0, {tags: req.params.tag}).then((posts) => {
    utils.getTotalNumberOfPages({tags: req.params.tag}).then((pages) => {
      let str = `Tag search for "${req.params.tag}"`
      res.render('posts', {bodyClass: 'index', header: str, tagline: str, curPage: 1, pages, posts, tag: req.params.tag})
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
      let str = `Tag search for "${req.params.tag}", page ${page}`
      res.render('posts', {bodyClass: 'index', header: str, tagline: str, curPage: page, pages, posts, tag: req.params.tag})
    })
  })
})

router.get('/login', function (req, res) {
  res.render('login', {user: req.user, title: 'Log In'})
})

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/admin')
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
