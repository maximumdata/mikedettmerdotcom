const router = require('express').Router()
const slug = require('slug')
const utils = require('../config/utils')
const Post = require.main.require('../models/post')

router.get('/create', (req, res) => {
  let id = null
  utils.getTotalNumberOfPosts().then((count) => {
    id = count + 1

    let newPost = new Post({
      id: id,
      title: `title number ${id}`,
      slug: slug(`title3 test @$&*$@%(#@!*#!)`), // ${Date.now()}`),
      content: 'String',
      desc: `${Date.now()} -- desc time`,
      created: Date.now(),
      createdStr: utils.stringFromDate(Date.now()),
      categories: ['1', '2', '3'],
      tags: ['4', '5', '6']
    })

    newPost.save((err, saved) => {
      if (err) throw err
      res.json(saved)
    })
  })
})

router.post('/create', (req, res) => {
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
      categories: utils.arrayFromCSV(body.categories),
      tags: utils.arrayFromCSV(body.tags)
    })

    newPost.save((err, saved) => {
      if (err) {
        if (err.code === 11000) {
          res.status(500).json(utils.jsonError('That slug is already in use', err))
        } else { throw err }
      }
      res.json(saved)
    })
  })
})

router.get('/delete', (req, res) => {
  Post.remove({}, (err) => {
    if (err) { throw err }
    res.send('deleted')
  })
})

module.exports = router
