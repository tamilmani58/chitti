var config = require("config/appconfig.js");
function message() {
    var defaultMessage = {
        "message": {
            "to": "g:" + config.defaultGroupId,
            "text": "Chitti Sample message"
        }
    };

    function setMessage(text) {
        defaultMessage.message.text = text;
    }

    function getMessageObject() {
        return defaultMessage;
    }

    return{
        setMessage : setMessage,
        getMessageObject: getMessageObject
    }
}