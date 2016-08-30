const router = require('express').Router()
const blog = require('./api/v1/blog/router')
const auth = require('./api/v1/auth/router')

router.use('/api/v1/blog', blog)
router.use('/api/v1/auth', auth)

module.exports = router
