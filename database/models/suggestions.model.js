
module.exports = (sequelize, DataTypes) => {
    const Suggestion = sequelize.define("suggestions", {
        id_suggestion: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        id_paper: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_user: {
            type: DataTypes.STRING,
            allowNull: true

        },
        comments: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: []
        },
        resolved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    // Suggestion.sync({ force: true }).then(() => console.log('SUGGESTION MODEL CREATED')).catch((err) => console.log('ERROR ' + err))
    return Suggestion
}

