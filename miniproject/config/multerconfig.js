const path = require('path');
const multer= require('multer');
const crypto = require('crypto');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads/')
    },
    filename: function (req, file, cb) {
        const fn = crypto.randomBytes(12,(err,fn)=>{
            const fnm = fn.toString("hex")+path.extname(file.originalname).toLowerCase();
            cb(null, fnm);
        })
      
    }
  })
  const upload = multer({ storage: storage });
  module.exports = upload;