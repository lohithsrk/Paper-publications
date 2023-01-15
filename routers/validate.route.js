const express = require('express')
const router = express.Router()

const { validateUser, generateOTP } = require('../controllers/validate.controller')

router.route('/validate').get(validateUser).post(generateOTP)

module.exports = router 