const express = require('express')
const router = express.Router()

const { allEmployees } = require('../controllers/employees.controller')
const { validateUser } = require('../middlewares/middlewares.util')

router.route('/users').get(validateUser, allEmployees)

module.exports = router 