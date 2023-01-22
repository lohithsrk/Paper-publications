const express = require('express')
const router = express.Router()

const { signUpPost, loginPost } = require('../controllers/auth.controller')

router.route('/signup').post(signUpPost)
router.route('/login').post(loginPost)

module.exports = router 