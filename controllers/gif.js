const fs = require("fs");
const sharp = require("sharp");

const Gif = require("../models/Gif");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

/* -- display gifs -- */
exports.getAllGifs = (req, res, next) => {
  Gif.findAll({
    attributes: ["userId", "gifId", "title", "url", "createdAt"],
    include: [
      {
        model: User,
        as: "User",
        attributes: ["avatar", "firstName", "lastName"],
      },
      {
        model: Comment,
        as: "Comments",
        attributes: ["commentId"],
      },
      {
        model: Like,
        as: "Likes",
        attributes: ["likeId"],
      },
    ],
  })
    .then((gifs) => res.status(200).json(gifs))
    .catch((error) => res.status(404).send({ error }));
};

/* -- display a gif -- */
exports.getOneGif = (req, res, next) => {
  Gif.findOne({
    where: { gifId: req.params.id },
    attributes: ["userId", "gifId", "title", "url", "createdAt"],
    include: [
      {
        model: User,
        as: "User",
        attributes: ["avatar", "firstName", "lastName"],
      },
      {
        model: Comment,
        as: "Comments",
        attributes: ["commentId"],
      },
      {
        model: Like,
        as: "Likes",
        attributes: ["likeId"],
      },
    ],
  })
    .then((gif) => res.status(200).json(gif))
    .catch((error) => res.status(404).send({ error }));
};

/* -- create a gif and resize uploaded image -- */
exports.createGif = (req, res, next) => {
  const userId = JSON.parse(req.body.userId);
  const title = JSON.parse(req.body.title);
  const gif = new Gif({
    userId: userId,
    title: title,
    url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  gif
    .save()
    .then((gif) => res.status(201).json(gif))
    .then(() => {
      sharp(req.file.path)
        .resize(1000)
        .toBuffer()
        .then((data) => {
          fs.writeFileSync(req.file.path, data);
        })
        .catch((error) => res.status(500).json({ error }));
    })

    .catch((error) => res.status(400).json({ error }));
};

/* -- modify a gif (and the image if necessary) -- */
exports.modifyGif = (req, res, next) => {
  const title = JSON.parse(req.body.title);
  if (req.file) {
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    Gif.findAll({ where: { gifId: req.params.id }, plain: true })
      .then((gif) => {
        const filename = gif.dataValues.url.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Gif.update(
            { title: title, url: url },
            { where: { gifId: req.params.id } }
          )
            .then(() => {
              sharp(req.file.path)
                .resize(1000)
                .toBuffer()
                .then((data) => {
                  fs.writeFileSync(req.file.path, data);
                  res.status(201).json({ message: "Gif modified !" });
                })
                .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    Gif.update({ title: title }, { where: { gifId: req.params.id } })
      .then(() => res.status(201).json({ message: "Gif modified !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

/* -- delete a gif and the image in the folder images -- */
exports.deleteGif = (req, res, next) => {
  Gif.findAll({ where: { gifId: req.params.id }, plain: true })
    .then((gif) => {
      const filename = gif.url.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Gif.destroy({ where: { gifId: req.params.id } })
          .then(() => res.status(200).json({ message: "Gif deleted" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
