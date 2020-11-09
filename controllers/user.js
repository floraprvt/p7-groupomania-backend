const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const User = require('../models/User')

/* -- allow user to signup -- */
exports.signup = (req, res, next) => {
  /* -- require valid email and strong password -- */
  if (!validator.isEmail(req.body.email)) {
    res.status(400).json('Your email must be valid')
  } else if (!validator.matches(req.body.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,50})/)) {
    res.status(400).json('Your password must be at least 8 character long, contain a lowercase, an uppercase and a number')
  } else {
    /* -- password "salted" 10 times -- */
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          officePosition: req.body.officePosition,
          email: req.body.email,
          password: hash
        })
        user.save()
          .then(() => res.status(201).json({ message: 'User created !' }))
          .catch(error => res.status(400).json({ error }))
      })
      .catch(error => res.status(500).json({ error }))
  }
}

/* -- allow user to login -- */
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }
      /* -- compare password with hash -- */
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password' })
          }
          /* -- create a token -- */
          res.status(200).json({
            userId: user.userId,
            token: jwt.sign(
              { userId: user.userId },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(400).json({ error }))
}
