const multer = require('multer')
const fs = require('fs')

exports.paperUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            path = `papers/${req.body.userId}`
            fs.mkdirSync(path, { recursive: true })
            cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        },
    }), limits: { fieldSize: 25 * 1024 * 1024 }
})
