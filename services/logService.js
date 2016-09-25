var uploadLogRepository = require("../repositories/uploadLogRepository");
var changeLogRepository = require("../repositories/changeLogRepository");
var userRepository = require("../repositories/userRepository");
var moment = require('moment');

var uuid = require("uuid");
var logService = function () {
    this.addUploadLog = function(changeLogCollection, jenkinsData){
        var uniqueId = uuid.v1();
        var dateTime = moment().utc().format();
        uploadLogRepository.createUploadLog({
            uploadID: uniqueId,
            datetime: dateTime,
            jenkinsRef: jenkinsData.jenkinsRef,
            type: jenkinsData.type
        });
        changeLogCollection.forEach(function (change) {
            userRepository.getUserByAd(change.userAd()).then(function (user) {
                changeLogRepository.createChangeLog({
                    uploadID: uniqueId,
                    email: user.email(),
                    changeLog: change.message()
                })
            });
        });
    }
};
module.exports = new logService();