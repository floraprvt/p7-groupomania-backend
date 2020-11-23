const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const likesCtrl = require("../controllers/like");

/* -- availables routes for comments, with authentication -- */
router.post("/:id", auth, likesCtrl.createLike);
router.delete("/:id", auth, likesCtrl.deleteLike);

module.exports = router;
