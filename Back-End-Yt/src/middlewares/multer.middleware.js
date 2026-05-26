import multer from "multer";

// const upload = multer({dest:'uploads/'})


//using diskstorage give more control over filename and destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname);
  }
})

export const upload = multer({ storage }) 