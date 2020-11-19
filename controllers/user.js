const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const fs = require("fs");
const sharp = require("sharp");

const User = require("../models/User");
const Gif = require("../models/Gif");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

/* -- diplay connected user -- */
exports.getUser = (req, res, next) => {
  User.findOne({
    where: { userId: req.params.id },
    attributes: [
      "userId",
      "firstName",
      "lastName",
      "avatar",
      "officePosition",
      "email",
    ],
    include: [
      {
        model: Gif,
        as: "Gifs",
        attributes: ["userId", "title"],
      },
      {
        model: Comment,
        as: "Comments",
        attributes: ["userId", "content"],
      },
      {
        model: Like,
        as: "Likes",
        attributes: ["userId", "gifId"],
      },
    ],
  })
    .then((user) => {
      const cleanUser = {
        credentials: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          officePosition: user.officePosition,
          email: user.email,
        },
        gifs: user.Gifs,
        comments: user.Comments,
        likes: user.Likes,
      };
      res.status(200).json(cleanUser);
    })
    .catch((error) => res.status(404).send({ error }));
};

/* -- allow user to signup -- */
exports.signup = (req, res, next) => {
  /* -- require valid email and strong password -- */
  if (!validator.isEmail(JSON.parse(req.body.email))) {
    res.status(400).json("Your email must be valid");
  } else if (
    !validator.matches(
      JSON.parse(req.body.password),
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,50})/
    )
  ) {
    res
      .status(400)
      .json(
        "Your password must be at least 8 character long, contain a lowercase, an uppercase and a number"
      );
  } else {
    /* -- password "salted" 10 times -- */
    bcrypt.hash(JSON.parse(req.body.password), 10).then((hash) => {
      const firstName = JSON.parse(req.body.firstName);
      const lastName = JSON.parse(req.body.lastName);
      const officePosition = JSON.parse(req.body.officePosition);
      const email = JSON.parse(req.body.email);
      const user = new User({
        avatar: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        firstName: firstName,
        lastName: lastName,
        officePosition: officePosition,
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          sharp(req.file.path)
            .resize(1000)
            .toBuffer()
            .then((data) => {
              fs.writeFileSync(req.file.path, data);
              res.status(200).json({
                userId: user.userId,
                token: jwt.sign(
                  { userId: user.userId },
                  "RANDOM_TOKEN_SECRET",
                  {
                    expiresIn: "24h",
                  }
                ),
              });
            })
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    });
  }
};

/* -- allow user to login -- */
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      /* -- compare password with hash -- */
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          /* -- create a token -- */
          res.status(200).json({
            userId: user.userId,
            token: jwt.sign({ userId: user.userId }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

/* -- modify user (and the avatar if necessary) -- */
exports.modifyUser = (req, res, next) => {
  const officePosition = JSON.parse(req.body.officePosition);
  if (req.file) {
    const avatar = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    User.findAll({ where: { userId: req.params.id }, plain: true })
      .then((user) => {
        const filename = user.dataValues.avatar.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          User.update(
            { officePosition: officePosition, avatar: avatar },
            { where: { userId: req.params.id } }
          )
            .then(() => {
              sharp(req.file.path)
                .resize(500)
                .toBuffer()
                .then((data) => {
                  fs.writeFileSync(req.file.path, data);
                  res.status(201).json({ message: "User modified !" });
                })
                .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    User.update(
      { officePosition: officePosition },
      { where: { userId: req.params.id } }
    )
      .then(() => res.status(201).json({ message: "User modified !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};
