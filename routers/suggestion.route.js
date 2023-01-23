const express = require('express')
const router = express.Router()

const { requestSuggestion, getSuggestions,allSuggestions } = require('../controllers/suggestion.controller')
const { validateUser } = require('../middlewares/middlewares.util')

router.route('/suggestion/request').post(validateUser, requestSuggestion).get(validateUser, allSuggestions)
router.route('/suggestion/:id_paper').get(validateUser, getSuggestions)


module.exports = router 