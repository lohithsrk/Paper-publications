
module.exports = (sequelize, DataTypes) => {
    const Paper = sequelize.define("papers", {
        id_paper: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true

        },
        link: {
            type: DataTypes.STRING,
            allowNull: false

        },
        id_user: {
            type: DataTypes.STRING,
            allowNull: false

        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Submitted'

        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: new Date().getFullYear()

        },
    })
    // Paper.sync({ force: true }).then(() => console.log('PAPER MODEL CREATED')).catch((err) => console.log('ERROR ' + err))
    return Paper
}

