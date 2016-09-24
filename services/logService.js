var uploadLogRepository = require("../repositories/uploadLogRepository");
var changeLogRepository = require("../repositories/changeLogRepository");
var userRepository = require("../repositories/userRepository");

var uuid = require("uuid");
var logService = function () {
    this.addUploadLog = function(changeLogCollection, jenkinsData){
        var uniqueId = uuid.v1();
        var dateTime = new Date();
        uploadLogRepository.createUploadLog({
            uploadID: uuid,
            dateTime: dateTime,
            jenkinsRef: jenkinsData.jenkinsRef,
            type: jenkinsData.type
        });
        changeLogCollection.forEach(function (change) {
           changeLogRepository.createChangeLog({
               uploadID: uuid,
               email: userRepository.getUserByAd(change.userAd),
               changeLog: change.message
           })
        });
    }
};
module.exports = new logService();