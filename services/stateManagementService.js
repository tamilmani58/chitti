/**
 * Created by pritam on 25/9/16.
 */
var Change = require('../models/change.js');
var curStatus = Change.State.LIVE_SUCCESS;
var currentStatus = function (status) {
    if (status === undefined) {
        return curStatus;
    }
    curStatus = status;

};

var stateManagementService = {
    currentStatus: currentStatus
};
module.exports = stateManagementService;