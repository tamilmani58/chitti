/**
 * Created by pritam on 25/9/16.
 */
var stateManagementService = require('../services/stateManagementService.js');
var uploadLogRepository = require('../repositories/uploadLogRepository.js');
var botService = require('../services/botService.js');

var Change = require('../models/change.js');
var getStatusMessage = function () {
    var statusMessage = '';
    var currentStatus = stateManagementService.currentStatus();
    if (currentStatus === Change.State.LIVE_SUCCESS) {
        var promise = uploadLogRepository.getLastUploadTime();
        return function (callback) {
            promise.then(function (promiseValue) {
                var messageTemplate = "Last successful upload was at TIME";
                callback({
                    "text": messageTemplate.replace("TIME", promiseValue.datetime)
                });
                return;
            });
        };
    }
    statusMessage = {'text': 'The Current Upload is in ' + currentStatus + ' Phase.'};
    return statusMessage;
};
var processSlashEvent = function (event) {
    var text = event.text.toLowerCase();
    if (text === 'status') {
        return getStatusMessage();
    } else if (text.indexOf('duration') !== -1) {
        var durationText = text.split(" ")[1];
        var format = durationText.substr(-1);
        var duration = parseInt(durationText.substring(0, durationText.length -1));
        botService.sendDurationNotification(event, duration, format);
        return {'text': 'Gimme Some Time'};
    } else {
        return {'text':'Sorry Wrong Command !'};
    }
};
var slashCommandService = {
    processSlashEvent: processSlashEvent
};
module.exports = slashCommandService;