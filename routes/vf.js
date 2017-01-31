const router = require('express').Router()
const utils = require('../config/utils')
const Brews = require('../models/brew')
const Account = require('../models/account')

router.get('/', (req, res) => {
  Brews.find({}, (err, brews) => {
    if (err) {
      res.status(500).json(err)
    }

    res.render('vfBrewsIndex', { bodyClass: 'brews', title: 'VF Brews', brews })
  })
})

router.get('/ok', (req, res) => {
  Account.find({}, (err, accs) => {
    res.json(accs)
  })
})

router.get('/edit', utils.isAuthenticated, (req, res) => {
  Brews.find({}, (err, brews) => {
    if (err) {
      res.json(err)
    }
    res.render('vfBrewsEditList', { bodyClass: 'editList' })
  })
})

router.get('/edit/:id', utils.isAuthenticated, (req, res) => {
  res.render('vfBrewsPostNew', { bodyClass: 'editBrew', title: 'VF Brews', brewToEdit: {title: 'fart'} })
})

router.get('/add', utils.isAuthenticated, (req, res) => {
  res.render('vfBrewsPostNew', { bodyClass: 'addNewBrew', title: 'Add New Brew' })
})

module.exports = router
