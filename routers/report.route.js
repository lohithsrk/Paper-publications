const express = require('express')
const router = express.Router()

const { generateReport } = require('../controllers/generateReport.controller')
const { validateUser } = require('../middlewares/middlewares.util')

router.route('/generate-report').get(generateReport)

module.exports = router 