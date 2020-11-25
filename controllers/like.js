const Like = require("../models/Like");

/* -- give a like -- */
exports.createLike = (req, res, next) => {
  const like = new Like({
    gifId: req.body.gifId,
    userId: req.body.userId,
  });
  like
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => res.status(400).json({ error }));
};

/* -- delete a like -- */
exports.deleteLike = (req, res, next) => {
  Like.destroy({ where: { gifId: req.params.id, userId: req.body.userId } })
    .then(() => res.status(200).json({ message: "Like deleted" }))
    .catch((error) => res.status(400).json({ error }));
};
