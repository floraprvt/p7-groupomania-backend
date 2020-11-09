const multer = require('multer')
const DIR = 'images/';


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}

/* -- saving uploaded images -- */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, DIR)
  },
  filename: (req, file, callback) => {
    // const name = file.originalname.split(' ').join('_')
    // const extension = MIME_TYPES[file.mimetype]
    // callback(null, name + Date.now() + '.' + extension)
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    callback(null, fileName)
  }
})



module.exports = multer({storage: storage}).single('image')
