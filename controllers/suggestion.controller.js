const uniqid = require('uniqid');
const { Op } = require('sequelize')

const { Suggestion, Paper } = require('../database/database')

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

exports.allSuggestions = async (req, res) => {

    var suggestions = await Suggestion.findAll({ attributes: ['id_paper'], raw: true })
    suggestions = suggestions.map((suggession) => (suggession.id_paper))

    var papers = await Paper.findAll({
        where: {
            id_paper: {
                [Op.overlap]: suggestions
            }
        }, raw: true
    })
    console.log("🚀 ~ file: suggestion.controller.js:40 ~ exports.allSuggestions= ~ papers", papers)


    res.json(papers)

}

