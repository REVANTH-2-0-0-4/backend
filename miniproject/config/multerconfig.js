const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'public', 'images', 'uploads');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fn = crypto.randomBytes(12, (err, fn) => {
      const fnm = fn.toString("hex") + path.extname(file.originalname);
      cb(null, fnm);
    })

  }
})
const upload = multer({ storage: storage });
module.exports = upload;