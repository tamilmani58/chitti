var sequelize = require("../services/sqlService");
var Sequelize = require("sequelize");
var uploadlog = sequelize.define('uploadlog', {
    uploadID: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    datetime: {
        type: Sequelize.DATE
    },
    jenkinsRef: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = uploadlog;