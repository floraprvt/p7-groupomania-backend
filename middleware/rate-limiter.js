const rateLimit = require('express-rate-limit')

module.exports = rateLimit({
  max: 5, // max attempts
  duration: 24 * 60 * 60 * 1000 // 24 h
})
