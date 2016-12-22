const router = require('express').Router()
const utils = require('../config/utils')
// const marked = utils.marked
const marked = require('marked')
// const Post = require.main.require('../models/post')

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

router.get('/:slug', (req, res) => {
  utils.getPostBySlug(req.params.slug).then((post) => {
    post.content = marked(post.content)
    res.render('post', { bodyClass: 'post', title: post.title, tagline: post.desc, post })
  }).catch((err) => {
    res.render('error', err)
  })
})

module.exports = router
