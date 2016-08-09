const router = require('express').Router(),
      testing = require('./testing/router.js');

router.use('/', testing);

module.exports = router;
