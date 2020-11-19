const Comment = require("../models/Comment");
const User = require("../models/User");

/* -- display comments -- */
exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    where: { gifId: req.params.id },
    include: [
      {
        model: User,
        as: "User",
        attributes: ["avatar", "firstName", "lastName"],
      },
    ],
    attributes: ["commentId", "content", "createdAt"],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(404).send({ error }));
};

/* -- get one comment -- */
exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    where: { commentId: req.params.id },
    include: [
      {
        model: User,
        as: "User",
        attributes: ["avatar", "firstName", "lastName"],
      },
    ],
    attributes: ["commentId", "content", "createdAt"],
  })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).send({ error }));
};

/* -- create a comment and resize uploaded image -- */
exports.createComment = (req, res, next) => {
  const comment = new Comment({
    gifId: req.params.id,
    userId: req.body.userId,
    content: req.body.content,
  });
  comment
    .save()
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(400).json({ error }));
};

/* -- modify a comment -- */
exports.modifyComment = (req, res, next) => {
  Comment.update({ ...req.body }, { where: { commentId: req.params.id } })
    .then(() => res.status(201).json({ message: "Comment modified !" }))
    .catch((error) => res.status(400).json({ error }));
};

/* -- delete a comment and the image in the folder images -- */
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { commentId: req.params.id } })
    .then(() => res.status(200).json({ message: "Comment deleted" }))
    .catch((error) => res.status(400).json({ error }));
};
