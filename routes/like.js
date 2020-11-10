const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const commentsCtrl = require('../controllers/like')

/* -- availables routes for comments, with authentication -- */
router.get('/:id', auth, commentsCtrl.getLikes)
router.post('/:id', auth, commentsCtrl.createLike)
router.delete('/:id', auth, commentsCtrl.deleteLike)

module.exports = router
