const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const commentsCtrl = require('../controllers/comment')

/* -- availables routes for comments, with authentication -- */
router.get('/:id', auth, commentsCtrl.getAllComments)
router.post('/:id', auth, commentsCtrl.createComment)
router.put('/:id', auth, commentsCtrl.modifyComment)
router.delete('/:id', auth, commentsCtrl.deleteComment)

module.exports = router
