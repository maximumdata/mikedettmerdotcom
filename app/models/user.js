let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

let UserSchema = new Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) { return next(err); }
      else {
        user.password = hash;
        next();
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (pass, callback) {
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);
