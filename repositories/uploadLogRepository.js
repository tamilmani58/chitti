var uploadLog = require('../dbmodels/Upload');
function uploadLogRepository() {
    this.createUploadLog = function(uploadLogObj){
        uploadLog.create(uploadLogObj);
    }

}

module.exports = new uploadLogRepository();