let JwtStrategy = require('passport-jwt').Strategy
let User = require('../app/models/user')
let DB = require('./db')
let ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = (passport) => {
  let opts = {}
  opts.secretOrKey = DB.secret
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({id: jwtPayload.id}, (err, user) => {
      if (err) { return done(err, false) }
      if (user) {
        return done(null, user)
      } else { done(null, false) }
    })
  }))
}
