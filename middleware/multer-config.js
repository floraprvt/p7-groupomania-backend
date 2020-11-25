const multer = require("multer");
const DIR = "images/";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "video/x-msvideo": "avi",
  "video/mpeg": "mpeg",
  "video/webm": "webm",
  "video/mp4": "mp4",
  "video/quicktime": "mov",
};

/* -- saving uploaded images -- */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, DIR);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
