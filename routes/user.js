const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

const limiter = require('../middleware/rate-limiter')
const multer = require('../middleware/multer-config')

/* -- available routes to create an account and login -- */
router.get('/:id', userCtrl.getUser)
router.post('/login', userCtrl.login)
router.post('/signup', multer, userCtrl.signup)
router.put('/:id', multer, userCtrl.modifyUser)

module.exports = router
