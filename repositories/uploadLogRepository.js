var uploadLog = require('../dbmodels/Upload');
var Sequelize = require("sequelize");
var sequelize = require("../services/sqlService");
var moment = require("moment");
function uploadLogRepository() {
    this.createUploadLog = function(uploadLogObj){
        return uploadLog.create(uploadLogObj);
    };

    this.getUploadsForDuration = function (start, end) {
        return sequelize.query("SELECT a.datetime, b.email, b.changelog FROM `uploadlog` a JOIN changelog b WHERE a.uploadID = b.uploadID and a.datetime between $start AND $end order by a.datetime DESC",
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