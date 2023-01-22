const { User } = require('../database/database')

exports.allEmployees = async (req, res) => {
    await User.findAll({ where: { role: 'standard' }, raw: true, order: [['updatedAt', 'DESC']] }).then(result => {
        res.json(result)
    })
}