const router = require('express').Router(),
      testing = require('./testing/router.js');

router.use('/testing', testing);

module.exports = router;
