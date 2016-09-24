var Message = require("../models/message");
var config = require("../config/appconfig");
var request = require("request");
function BotService() {
    var pushMessageTemplate = [ "Hey @USERNAME, I received your changes",
         "Hurray USERNAME, I got you"
        ];
    var options = {
        "url" : config.FLOCK_SEND_MESSAGE_ENDPOINT,
        "headers": {
            "X-Flock-User-Token" : config.BOT_TOKEN
        }
    };

    this.sendPushNotification = function (pushConfig) {
        console.log('inside pn', pushConfig);
        var message = new Message();
        message.to(config.DEFAULT_GROUP_ID)
            .from(config.BOT_GUID)
            .text(pushMessageTemplate[0].replace("USERNAME", pushConfig.adName));

        function callback(error, response, body) {
            console.log(error, response);
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
        options.body = message.toJSON();
        options.method = 'POST';
        console.log(options);
        request(options, callback);
    }

}

module.exports = new BotService();