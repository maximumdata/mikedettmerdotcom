let JwtStrategy = require('passport-jwt').Strategy,
    User = require('../app/models/user'),
    DB = require('./db'),
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
  let opts = {};
  opts.secretOrKey = DB.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.id}, (err, user) => {
      if (err) { return done(err, false); }
      if (user) { return done(null, user); }
      else { done(null, false); }
    });
  }));
};
