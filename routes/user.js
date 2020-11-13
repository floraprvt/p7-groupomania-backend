const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

const limiter = require('../middleware/rate-limiter')

/* -- available routes to create an account and login -- */
router.get('/:id', userCtrl.getUser)
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
