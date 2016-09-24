var uploadLog = require('../dbmodels/Upload');
var Sequelize = require("sequelize");
var sequelize = require("../services/sqlService");
var moment = require("moment");
function uploadLogRepository() {
    this.createUploadLog = function(uploadLogObj){
        return uploadLog.create(uploadLogObj);
    };

    this.getUploadsForDuration = function (start, end) {
        return sequelize.query("SELECT datetime, email, changelog FROM `uploadlog` JOIN changelog on uploadlog.uploadID WHERE datetime BETWEEN $start AND $end",
            { bind: {start :start, end: end}, type: Sequelize.QueryTypes.SELECT}
            ).then(function (uploads) {
            return uploads
        });
    };

    this.getLastUploadTime = function () {
        return uploadLog.findOne({
            order: [['datetime' , 'DESC']],
            limit: 1
        }).then(function (lastUpload) {
            return lastUpload;
        });
    }
}

module.exports = new uploadLogRepository();