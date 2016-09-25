var sequelize = require("../services/sqlService");
var Sequelize = require("sequelize");
var userlog = sequelize.define('userLog', {
    userToken: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    userAd: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = userlog;