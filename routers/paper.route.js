const express = require('express')
const router = express.Router()

const { paperUpload } = require('../utils/multer.util')

const { addPaperPost, papersGet, setPaperStatus, getParticularPaper, servePaper } = require('../controllers/paper.controller')
const { validateUser } = require('../middlewares/middlewares.util')

router.route('/addpaper').post(validateUser, paperUpload.single('paper'), addPaperPost).get(validateUser, papersGet)
router.route('/getpaper/particular').post(getParticularPaper)
router.route('/getpaper/:id_user/:order').get(validateUser, papersGet)
router.route('/setpaper/status').post(validateUser, setPaperStatus)
router.route('/papers/:id_user/:id_paper/:filename').post(servePaper)


module.exports = router 