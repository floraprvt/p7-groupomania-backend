const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const gifsCtrl = require("../controllers/gif");

/* -- availables routes for gifs, with authentication -- */
router.get("/", auth, gifsCtrl.getAllGifs);
router.get("/:id", auth, gifsCtrl.getOneGif);
router.post("/", auth, multer, gifsCtrl.createGif);
router.put("/:id", auth, multer, gifsCtrl.modifyGif);
router.delete("/:id", auth, gifsCtrl.deleteGif);

module.exports = router;
