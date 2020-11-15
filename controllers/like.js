const Like = require('../models/Like')
const User = require('../models/User')

/* -- display likes -- */
exports.getLikes = (req, res, next) => {
  Like.findAll({ where: { gifId: req.params.id } })
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(404).send({ error }))
}

/* -- create a like and resize uploaded image -- */
exports.createLike = (req, res, next) => {
  const like = new Like({
    gifId: req.body.gifId,
    userId: req.body.userId,
  })
  like.save()
    .then(() => { res.status(201).json({ message: 'Like added !' }) })
    .catch(error => res.status(400).json({ error }))
}

/* -- delete a like and the image in the folder images -- */
exports.deleteLike = (req, res, next) => {
  console.log(req.body)
  Like.destroy({ where: { gifId: req.params.id, userId: req.body.userId } })
    .then(() => res.status(200).json({ message: 'Like deleted' }))
    .catch(error => res.status(400).json({ error }))
}