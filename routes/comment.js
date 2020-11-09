const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const commentsCtrl = require('../controllers/comment')

/* -- availables routes for comments, with authentication -- */
router.get('/:id', auth, commentsCtrl.getAllComments)
router.post('/:id', auth, commentsCtrl.createComment)
router.put('/:id', auth, multer, commentsCtrl.modifyComment)
router.delete('/:id', auth, commentsCtrl.deleteComment)

router.post('/:id/comments/:id/like', auth, commentsCtrl.likeComment)

module.exports = router
