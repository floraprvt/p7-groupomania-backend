const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

/* -- Create Relations  -- */
const User = require("./models/User");
const Gif = require("./models/Gif");
const Comment = require("./models/Comment");
const Like = require("./models/Like");

User.hasMany(Gif, {
  as: "Gifs",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Gif.belongsTo(User, { as: "User", foreignKey: "userId" });

User.hasMany(Comment, {
  as: "Comments",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Comment.belongsTo(User, { as: "User", foreignKey: "userId" });

Gif.hasMany(Comment, {
  as: "Comments",
  foreignKey: "gifId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Comment.belongsTo(Gif, { as: "Gif", foreignKey: "gifId" });

User.hasMany(Like, {
  as: "Likes",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Like.belongsTo(User, { as: "User", foreignKey: "userId" });

Gif.hasMany(Like, { as: "Likes", foreignKey: "gifId", onDelete: "CASCADE", onUpdate: "NO ACTION" });
Like.belongsTo(Gif, { as: "Gif", foreignKey: "gifId" });

const app = express();

const userRoutes = require("./routes/user");
const gifRoutes = require("./routes/gif");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");

/* -- DB Connection -- */
require("./database/connection");

// sequelize.sync({ alter: true })

/* -- configure request headers -- */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/* -- extract data from frontend -- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* -- configure routes path -- */
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/gifs", gifRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

module.exports = app;
