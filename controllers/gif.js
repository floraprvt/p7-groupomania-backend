const fs = require('fs')
const sharp = require('sharp')

const Gif = require('../models/Gif')
const User = require('../models/User')
const Comment = require('../models/Comment')

/* -- display gifs -- */
exports.getAllGifs = (req, res, next) => {
  Gif.findAll({
    attributes: ['gifId', 'title', 'url', 'likes', [sequelize.fn('date_format', sequelize.col('gif.createdAt'), 'le %e %b à %k:%i'), 'createdAtFormed']],
    include: [{
      model: User,
      as: 'User',
      attributes: ['firstName', 'lastName']
    },
    {
      model: Comment,
      as: 'Comments',
      attributes: ['gifId']
    }
    ]
  })
    .then(gifs => res.status(200).json(gifs))
    .catch(error => res.status(404).send({ error }))
}

/* -- display a gif -- */
exports.getOneGif = (req, res, next) => {
  Gif.findOne({
    where: { gifId: req.params.id },
    attributes: ['gifId', 'title', 'url', 'likes', [sequelize.fn('date_format', sequelize.col('gif.createdAt'), 'le %e %b à %k:%i'), 'createdAtFormed']],
    include: [{
      model: User,
      as: 'User',
      attributes: ['firstName', 'lastName']
    },
    {
      model: Comment,
      as: 'Comments',
      attributes: ['gifId']
    }]
  })
    .then(gif => res.status(200).json(gif))
    .catch(error => res.status(404).send({ error }))
}

/* -- create a gif and resize uploaded image -- */
exports.createGif = (req, res, next) => {
  const gif = new Gif({
    userId: req.body.userId,
    title: JSON.parse(req.body.title),
    url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  gif.save()
    .then(() => {
      sharp(req.file.path)
        .resize(500)
        .toBuffer()
        .then(data => {
          fs.writeFileSync(req.file.path, data)
          res.status(201).json({ message: 'Gif created !' })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(400).json({ error }))
}

/* -- modify a gif (and the image if necessary) -- */
exports.modifyGif = (req, res, next) => {
  const title = JSON.parse(req.body.title)
  if (req.file) {
    const url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    Gif.findAll({ where: { gifId: req.params.id }, plain: true })
      .then(gif => {
        const filename = gif.dataValues.url.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Gif.update({ title: title, url: url, likes: 0 }, { where: { gifId: req.params.id } })
            .then(() => {
              sharp(req.file.path)
                .resize(480, 480)
                .toBuffer()
                .then(data => {
                  fs.writeFileSync(req.file.path, data)
                  res.status(201).json({ message: 'Gif modified !' })
                })
                .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(400).json({ error }))
        })
      })
      .catch(error => res.status(500).json({ error }))
  } else {
    Gif.update({ title: title }, { where: { gifId: req.params.id }},  )
      .then(() => res.status(201).json({ message: 'Gif modified !' }))
      .catch(error => res.status(400).json({ error }))
  }
}

/* -- delete a gif and the image in the folder images -- */
exports.deleteGif = (req, res, next) => {
  Gif.findAll({ where: { gifId: req.params.id }, plain: true })
    .then(gif => {
      const filename = gif.url.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Gif.destroy({ where: { gifId: req.params.id } })
          .then(() => res.status(200).json({ message: 'Gif deleted' }))
          .catch(error => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
}

/* -- allow to like ou dislike a gif -- */
exports.likeGif = (req, res, next) => {
  Gif.findAll({ where: { gifId: req.params.id } })
    .then(gif => {
      switch (req.body.like) {
        /* -- if user clicks on like -- */
        case 1:
          if (!gif.usersLiked.includes(req.body.userId)) {
            Gif.updateOne(
              { where: { gifId: req.params.id } },
              { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id }
            )
              .then(() => res.status(201).json({ message: 'Like added' }))
              .catch(error => res.status(400).json({ error }))
          }
          break
        /* -- if user clicks on dislike -- */
        case -1:
          if (!gif.usersDisliked.includes(req.body.userId)) {
            Gif.updateOne(
              { where: { gifId: req.params.id } },
              { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id }
            )
              .then(() => res.status(201).json({ message: 'Dislike added' }))
              .catch(error => res.status(400).json({ error }))
          }
          break
        /* -- if user clicks while he already liked or disliked -- */
        case 0:
          if (gif.usersLiked.includes(req.body.userId)) {
            Gif.updateOne(
              { where: { gifId: req.params.id } },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 }, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: 'Like removed' }))
              .catch(error => res.status(400).json({ error }))
          } else if (gif.usersDisliked.includes(req.body.userId)) {
            Gif.updateOne(
              { where: { gifId: req.params.id } },
              { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 }, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: 'Dislike removed' }))
              .catch(error => res.status(400).json({ error }))
          }
      }
    })
    .catch(error => res.status(500).json({ error }))
}
