/**
 * Created by pritam on 25/9/16.
 */
var stateManagementService = require('../services/stateManagementService.js');
var uploadLogRepository = require('../repositories/uploadLogRepository.js');

var Change = require('../models/change.js');
var getStatusMessage = function () {
    var statusMessage = '';
    var currentStatus = stateManagementService.currentStatus();
    if (currentStatus === Change.State.LIVE_SUCCESS) {
        var promise = uploadLogRepository.getLastUploadTime();
        return function (callback) {
            promise.then(function (promiseValue) {
                callback({
                   "text": promiseValue
                });
                return;
            });
        };
        statusMessage = 'The last Upload is live';
    } else {
        statusMessage = 'The Current Upload is in ' + currentStatus + ' Phase.';
    }
    return statusMessage;
};
var processText = function (event) {
    var text = event.text.toLowerCase();
    switch (text) {
        case 'status':
            return getStatusMessage();
        case 'duration':
            return 'Gimme Some Time';
        default:
            return 'Sorry Wrong Command !';
    }
};
var slashCommandService = {
    processText: processText
};
module.exports = slashCommandService;