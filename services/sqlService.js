var Sequelize = require('sequelize');
var dbconfig = require('../config/dbconfig');
var sequelize = new Sequelize(dbconfig.DATABASE, dbconfig.USERNAME, dbconfig.PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
});
module.exports = sequelize;
