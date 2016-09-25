var Message = require("../models/message");
var config = require("../config/appconfig");
var request = require("request");
var util = require('../util');
var uploadLogRepository = require('../repositories/uploadLogRepository');
var templateService = require('../services/templateService.js');
var handlebars = require('handlebars');
var moment = require('moment');
function BotService() {
    var successStageTemplate = [
        "Hey @USERNAME, Your changes are ready in SETUP",
        "Hurray @USERNAME, I got you in SETUP",
        "Hey @USERNAME, Keep calm and do tests, SETUP is ready",
        "Hey @USERNAME, Check the code in SETUP before we Take Off",
        "Hey @USERNAME, This is your Last Resort, code is ready in SETUP"
        ];

    var successLiveTemplate = [
        "Hey @USERNAME, Buckle Up you ppl just affected Billions of Users",
        "Hey @USERNAME, And we shipped IT",
        "Hey @USERNAME, Buckle up, we are Live",
        "Hey @USERNAME, You did it",
        "Hey @USERNAME, Game ON, we are Live"
    ];

    var failTemplate = [
        "Hey @USERNAME, heads up. We screwed something up in SETUP",
        ""
    ];
    var options = {
        "url" : config.FLOCK_SEND_MESSAGE_ENDPOINT,
        "headers": {
            "X-Flock-User-Token" : config.BOT_TOKEN
        }
    };

    this.sendMessageCallback = function(error, response, body) {
        if (!error && response.statusCode == 200) {

        } else{
            console.log(error);
        }
    };

    function sendMessage(messageTxt, callback) {
        var message = new Message()
            .to(config.DEFAULT_GROUP_ID)
            .from(config.BOT_GUID)
            .text(messageTxt);
        options.body = message.toJSON();
        options.method = 'POST';
        request(options, callback);
    }
    function postAttachment(userId, duration, html) {
        var requestBody = {};
        requestBody.message = {};
        requestBody.message.to = userId;
        requestBody.message.text = "Here You Go"
        requestBody.message.attachments = [];
        var attachment = {};
        attachment.title = "Change Logs";
        attachment.description = "Change Logs for " + duration;
        attachment.views = {};
        attachment.views.html = {};
        attachment.views.html.inline = html;
        attachment.views.html.width = 400;
        attachment.views.html.height = 400;
        requestBody.message.attachments.push(attachment);
        options.body = JSON.stringify(requestBody);
        options.method = 'POST';
        request(options, function (err) {
            console.log(err);
        });
    }

    this.sendStageBuildSuccessNotification = function (pushConfig) {
        var messageText = successStageTemplate[util.getRandom(0, successStageTemplate.length - 1)]
            .replace("USERNAME", pushConfig.adName).replace("SETUP", "Stage");
        sendMessage(messageText, this.sendMessageCallback);
    };

    this.sendStageBuildFailNotification = function (pushConfig) {
        var messageText = failTemplate[util.getRandom(0, failTemplate.length - 1)]
            .replace("USERNAME", pushConfig.adName).replace("SETUP", "Stage");
        sendMessage(messageText, this.sendMessageCallback);
    };

    this.sendLiveBuildSuccessNotification = function (pushConfig) {
        var messageText = successLiveTemplate[util.getRandom(0, successLiveTemplate.length - 1)]
            .replace("USERNAME", pushConfig.adName).replace("SETUP", "Live");
        sendMessage(messageText, this.sendMessageCallback);
    };
    this.sendLiveBuildFailNotification = function (pushConfig) {
        var messageText = failTemplate[util.getRandom(0, failTemplate.length - 1)]
            .replace("USERNAME", pushConfig.adName).replace("SETUP", "Live");
        sendMessage(messageText, this.sendMessageCallback);
    };
    this.sendDurationNotification = function (event, duration, format) {
        var endTime = moment().utc().format();
        var startTime = moment().subtract(duration, format).utc().format();
        console.log(duration,format);
        var getUploadsPromise = uploadLogRepository.getUploadsForDuration(startTime, endTime);

        return getUploadsPromise.then(function (data) {
            console.log(data);
            var parsedResponse = {};
            if (util.isArray(data) && data.length > 0) {
                data.forEach(function (changeLog) {
                    var changeLogResponse = {};
                    var date = changeLog.datetime;
                    date = moment(date).format("MMM DD, YYYY (ddd)");
                   parsedResponse[date] =  parsedResponse[date] || [];
                    changeLogResponse.changeLog = changeLog.changelog;
                    changeLogResponse.adName = changeLog.email.split('@')[0];
                    changeLogResponse.uploadHr = moment(date).format("HH:mm");
                    parsedResponse[date].push(changeLogResponse)
                });
            }
            var changeListTemplateString = templateService.getChangeListTemplate();
            var changeListTemplate = handlebars.compile(changeListTemplateString);
            var changeListHtml = changeListTemplate(parsedResponse);

            postAttachment(event.userId, duration, changeListHtml);

        });

    }
}

module.exports = new BotService();