let router = require('express').Router(),
    User = require.main.require('./models/user'),
    DB = require.main.require('../config/db'),
    passport = require('passport'),
    jwt = require('jwt-simple');

router.post('/register', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.status(400).json({success: false, msg: 'Missing username or password'});
  } else {
    User.find({}, (err, users) => {
      if (err) { res.status(500).send({success: false, err: err, msg: 'Failed searching all users'}); }
      if(users.length) {
        res.status(500).send({ success: false, msg: 'Sorry, a user has already been registered for this installation.' });
      } else {
        let newUser = new User({
          name: req.body.name,
          password: req.body.password
        });

        newUser.save((err) => {
          if (err) {
            return res.status(500).json({success: false, msg: 'Username already exists'});
          }
          res.status(201).json({success: true, msg: 'Successfully created new user'});
        });
      }
    });
  }

});

router.get('/register', (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
  //res.send({ success: false, msg: 'Get outta here'});
});

router.delete('/register', (req, res) => {
  // User.remove({}, (err) => {
  //   if (err) { return res.status(500).send({ success: false, msg: 'Failed to delete users, check err property for details', err: err}); }
  //   else {
  //     res.send({ success: true, msg: 'Deleted all users'});
  //   }
  // });
  res.status(404).send({success: false, msg: 'wtf are you trying to do mate'});
});

router.post('/', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) { throw err; }
    if (!user) {
      res.status(500).send({success: false, msg: 'User not found'});
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) { return res.send({success: false, msg: err}); }
        if (isMatch) {
          let token = jwt.encode(user, DB.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(500).send({success: false, msg: 'Wrong password'});
        }
      });
    }
  });
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    let decoded = jwt.decode(token, DB.secret);
    User.findOne({ name: decoded.name}, (err, user) => {
      if (err) { throw err; }
      if (!user) {
        return res.status(403).send({success: false, msg: 'User not found'});
      } else {
        res.json({success: true, msg: 'Hey ' + user.name });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided'});
  }
});

let getToken = (headers) => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else { return null; }
}

module.exports = router;
