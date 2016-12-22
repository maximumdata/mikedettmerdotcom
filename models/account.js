let mongoose = require.main.require('../config/db')
let passportLocalMongoose = require('passport-local-mongoose')

var Account = new mongoose.Schema({})

Account.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', Account)
