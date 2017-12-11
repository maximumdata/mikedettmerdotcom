const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise

const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongoUrl, { useMongoClient: true })
  } catch (err) {
    console.error(err)
  }
}

module.exports = connectToDB
