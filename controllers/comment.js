const fs = require('fs')
const sharp = require('sharp')

const Comment = require('../models/Comment')
const User = require('../models/User')

/* -- display comments -- */
exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    where: { gifId: req.params.id },
    include: [{
      model: User,
      as: 'User',
      attributes: ['firstName', 'lastName']
    }],
    attributes: ['commentId', 'content', 'attachment', 'likes', [sequelize.fn('date_format', sequelize.col('comment.createdAt'), 'le %e %b à %k:%i'), 'createdAtFormed']]
  })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(404).send({ error }))
}

/* -- create a comment and resize uploaded image -- */
exports.createComment = (req, res, next) => {
  const comment = new Comment({
    gifId: req.body.gifId,
    userId: req.body.userId,
    content: req.body.content
  })
  comment.save()
    .then(() => { res.status(201).json({ message: 'Comment created !' }) })
    .catch(error => res.status(400).json({ error }))
}

/* -- modify a comment (and the image if necessary) -- */
exports.modifyComment = (req, res, next) => {
  Comment.updateOne({ where: { commentId: req.params.id } }, { ...req.body, $set: { likes: 0, dislikes: 0, usersLiked: [], usersDisliked: [] }, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Comment modified !' }))
    .catch(error => res.status(400).json({ error }))
}

/* -- delete a comment and the image in the folder images -- */
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { commentId: req.params.id } })
    .then(() => res.status(200).json({ message: 'Comment deleted' }))
    .catch(error => res.status(400).json({ error }))
}

/* -- allow to like ou dislike a comment -- */
exports.likeComment = (req, res, next) => {
  Comment.findOne({ where: { commentId: req.params.id } })
    .then(comment => {
      switch (req.body.like) {
        /* -- if user clicks on like -- */
        case 1:
          if (!comment.usersLiked.includes(req.body.userId)) {
            Comment.updateOne(
              { where: { commentId: req.params.id } },
              { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id }
            )
              .then(() => res.status(201).json({ message: 'Like added' }))
              .catch(error => res.status(400).json({ error }))
          }
          break
        /* -- if user clicks on dislike -- */
        case -1:
          if (!comment.usersDisliked.includes(req.body.userId)) {
            Comment.updateOne(
              { where: { commentId: req.params.id } },
              { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id }
            )
              .then(() => res.status(201).json({ message: 'Dislike added' }))
              .catch(error => res.status(400).json({ error }))
          }
          break
        /* -- if user clicks while he already liked or disliked -- */
        case 0:
          if (comment.usersLiked.includes(req.body.userId)) {
            Comment.updateOne(
              { where: { commentId: req.params.id } },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 }, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: 'Like removed' }))
              .catch(error => res.status(400).json({ error }))
          } else if (comment.usersDisliked.includes(req.body.userId)) {
            Comment.updateOne(
              { where: { commentId: req.params.id } },
              { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 }, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: 'Dislike removed' }))
              .catch(error => res.status(400).json({ error }))
          }
      }
    })
    .catch(error => res.status(500).json({ error }))
}
