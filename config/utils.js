const Post = require('../models/post')
const options = require('./options')
const markedPackage = require('marked')

markedPackage.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

const utils = {
  getTotalNumberOfPosts: (searchOptions = {hidden: false}) => {
    // console.log('posts', searchOptions)
    return new Promise(
        (resolve, reject) => {
          Post.count(searchOptions, (err, count) => {
            if (err) { reject(err) }
            resolve(count)
          })
        }
    )
  },

  getTotalNumberOfPages: (searchOptions = {hidden: false}) => {
    // console.log('pages', searchOptions)
    return new Promise((resolve, reject) => {
      utils.getTotalNumberOfPosts(searchOptions).then((count) => {
        resolve(Math.ceil(count / options.postsPerPage))
      }).catch((err) => {
        reject(err)
      })
    })
  },

  getPostsByPage: (page, searchOptions = {hidden: false}) => {
    return new Promise(
      (resolve, reject) => {
        let skipCount = page - 1 > 0 ? page - 1 : 0
        Post.find(searchOptions, 'title slug desc createdStr tags', { sort: '-id', limit: options.postsPerPage, skip: (skipCount * options.postsPerPage) }, (err, posts) => {
          if (err) { reject(err) }
          resolve(posts)
        })
      }
    )
  },

  getPostBySlug: (slug) => {
    return new Promise(
      (resolve, reject) => {
        Post.findOne({slug: slug}, (err, post) => {
          if (err) { reject(err) }
          if (!post) { reject({ error: { status: 'No post with that slug was found' } }) }
          resolve(post)
        })
      }
    )
  },

  getPostById: (id) => {
    return new Promise((resolve, reject) => {
      Post.findOne({id: id}, (err, post) => {
        if (err) { reject(err) }
        if (!post) { reject({ error: { status: 'No post with that ID was found' } }) }
        resolve(post)
      })
    })
  },

  getAllPosts: () => {
    return new Promise(
      (resolve, reject) => {
        Post.find({}, (err, posts) => {
          if (err) { reject(err) }
          resolve(posts)
        })
      }
    )
  },

  updatePostById: (id, body) => {
    body.tags = utils.arrayFromCSV(body.tags)
    return new Promise((resolve, reject) => {
      utils.getPostById(id).then((post) => {
        Post.findOneAndUpdate({id: id}, body, (err, post) => {
          if (err) { reject(err) }
          resolve(post)
        })
      }).catch((err) => {
        reject(utils.jsonError('Unable to find post with that ID', err))
      })
    })
  },

  getOptions: () => {
    return options
  },

  arrayFromCSV: (csv) => {
    let arr = csv.split(',')
    arr.forEach((e, i, a) => {
      a[i] = e.trim()
    })
    return arr
  },

  jsonError: (reason, err) => {
    return { status: 'failed', reason, err }
  },

  stringFromDate: (date) => {
    if (typeof date !== 'object') {
      date = new Date(date)
    }
    function nth (d) {
      if (d > 3 && d < 21) return 'th'
      switch (d % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
      }
    }
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let day = days[date.getDay()]
    let month = months[date.getMonth()]
    let dateNum = date.getDate()

    let time = date.getHours() > 13 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} PM`

    return `${day}, ${dateNum}${nth(dateNum)} of ${month}, ${date.getFullYear()} at ${time}`
  },

  marked: () => {
    return markedPackage
  },

  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }

    res.redirect('/login')
  }
}

module.exports = utils
