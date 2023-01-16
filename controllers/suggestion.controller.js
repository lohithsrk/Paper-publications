var uniqid = require('uniqid');

const { Suggestion } = require('../database/database')

exports.requestSuggestion = async (req, res) => {
    const { id_paper, id_user } = req.body
    const id_suggestion = uniqid()

    const suggestion = await Suggestion.findOne({ where: { id_paper }, raw: true })

    if (suggestion) return res.json('Suggestion requested already')

    await Suggestion.create({
        id_suggestion, id_paper, id_user
    }).then(response => {
        res.json('Suggestion requested!')
    })
}

exports.getSuggestions = async (req, res) => {
    const { id_paper } = req.params

    const suggestions = await Suggestion.findOne({ where: { id_paper }, raw: true })

    res.json(suggestions)

}