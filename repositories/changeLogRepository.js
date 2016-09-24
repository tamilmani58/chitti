var changeLog = require('../dbmodels/changelog');
function changeLogRepository() {
    this.createChangeLog = function(changeLogObj){
        changeLog.create(changeLogObj);
    }
}

module.exports = new changeLogRepository();