var sequelize = require("../services/sqlService");
var Sequelize = require("sequelize");
var changelog = sequelize.define('changelog', {
    id: {
        type: Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true
    },
    uploadID: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    changeLog: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = changelog;