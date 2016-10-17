let router = require('express').Router()

router.get('/verify', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === 'i_am_the_lucid_dream') {
    console.log('Validating webhook')
    res.status(200).send(req.query['hub.challenge'])
  } else {
    console.error('Failed validation. Make sure the validation tokens match.')
    res.sendStatus(403)
  }
})

module.exports = router
