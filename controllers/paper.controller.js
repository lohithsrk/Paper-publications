var uniqid = require('uniqid');
const path = require('path');

const { Paper } = require('../database/database')

exports.papersGet = async (req, res) => {
    try {
        const { id_user, order } = req.params
        await Paper.findAll({ where: { id_user }, raw: true, order: [['createdAt', order]] }).then(response => {
            res.json(response)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ e });
    }
}

exports.addPaperPost = async (req, res) => {
    try {
        const { title, description, userId } = req.body;

        const id_paper = uniqid()

        await Paper.create({
            id_paper,
            title,
            description,
            link: req.file.path,
            id_user: userId
        }).then(() => {
            res.json('ok')
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }

}

exports.updatePaperPost = async (req, res) => {
    try {
        await Paper.update({ ...req.body, link: req.file ? req.file.path : req.body.link }, { where: { id_paper: req.body.id_paper }, raw: true }).then(response => {
            res.json('ok')
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }

}

exports.setPaperStatus = async (req, res) => {
    try {
        const { id_paper, status } = req.body

        await Paper.update({ status }, { where: { id_paper }, raw: true }).then(response => {
            res.json('ok')
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.getParticularPaper = async (req, res) => {
    try {
        const { id_user, id_paper } = req.body
        await Paper.findOne({ where: { id_user, id_paper }, raw: true }).then(response => {
            res.json(response)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.servePaper = async (req, res) => {
    const { url } = req
    const paperPath = path.join(__dirname, '../', decodeURI(url))
    res.sendFile(paperPath);
}
exports.recentPapers = async (req, res) => {
    try {
        await Paper.findAll({ raw: true, order: [['updatedAt', 'DESC']], limit: 15 }).then(response => {
            res.json(response)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}