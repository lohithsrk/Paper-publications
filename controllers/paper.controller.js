var uniqid = require('uniqid');

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