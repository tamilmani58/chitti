var Message = require("../models/message");
var config = require("../config/appconfig");
var request = require("request");
var util = require('../util');
function BotService() {
    var successMessageTemplate = [
        "Hey @USERNAME, I received your changes in SETUP",
        "Hurray USERNAME, I got you in SETUP"
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
            console.log(body);

        } else{
            console.log(error);
        }
    };

    function sendMessasge(messageTxt, callback) {
        var message = new Message()
            .to(config.DEFAULT_GROUP_ID)
            .from(config.BOT_GUID)
            .text(messageTxt);
        options.body = message.toJSON();
        options.method = 'POST';
        request(options, callback);
    }

    this.sendStageBuildSuccessNotification = function (pushConfig) {
        var messageText = successMessageTemplate[util.getRandom(0, successMessageTemplate.length - 1)]
            .replace("USERNAME", pushConfig.adName).replace("SETUP", "Stage");
        sendMessasge(messageText, this.sendMessageCallback);
    };

    this.sendStageBuildFailNotification = function (pushConfig) {
        var messageText = failTemplate[util.getRandom(0, failTemplate.length - 1)]
            .replace("USERNAME", pushConfig.adName).replace("SETUP", "Stage");
        sendMessasge(messageText, this.sendMessageCallback);
    };

    this.sendLiveBuildSuccessNotification = function (pushConfig) {
        var messageText = successMessageTemplate[util.getRandom(0, successMessageTemplate.length - 1)]
            .replace("USERNAME", pushConfig.adName).replace("SETUP", "Live");
        sendMessasge(messageText, this.sendMessageCallback);
    };
    this.sendLiveBuildFailNotification = function (pushConfig) {
        var messageText = failTemplate[util.getRandom(0, failTemplate.length - 1)]
            .replace("USERNAME", pushConfig.adName).replace("SETUP", "Live");
        sendMessasge(messageText, this.sendMessageCallback);
    };

}

module.exports = new BotService();