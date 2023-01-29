const uniqid = require('uniqid');
const { Op } = require('sequelize')

const { Suggestion, Paper, User } = require('../database/database')

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
    ids = suggestions.comments.map(comment => comment.id_user)
    const users = await User.findAll({ where: { id_user: { [Op.in]: ids }, }, attributes: ['name', 'id_user'], raw: true })

    var comment = suggestions.comments.map(comment => {
        matchedUser = users.filter(user => user.id_user === comment.id_user)[0]
        return {
            comment: comment.comment,
            username: matchedUser.name
        }
    })

    res.json({ ...suggestions, comments: users.length > 0 ? comment : null })

}

exports.allSuggestions = async (req, res) => {

    var suggestions = await Suggestion.findAll({
        where: {
            resolved: false
        }, attributes: ['id_paper'], raw: true
    })
    suggestions = suggestions.map((suggession) => {
        return (suggession.id_paper)
    })
    var papers = await Paper.findAll({
        where: {
            id_paper: {
                [Op.in]: suggestions
            }
        }, raw: true
    })

    res.json(papers)

}

exports.updateSuggession = async (req, res) => {
    const { comment, id_paper, id_user } = req.body
    var comments = await Suggestion.findAll({
        where: {
            id_paper
        }, attributes: ['comments'], raw: true
    })
    await Suggestion.update(
        { comments: [...comments[0].comments, { id_user, comment }] },
        { where: { id_paper } }
    );

    res.json('ok')
}