var config = require("../config/appconfig.js");
function Message() {
    var to, from, text;

    this.to = function (toAddr) {
        if(toAddr === undefined){
            return to;
        }
        to = toAddr;
        return this;
    };

    this.from = function (fromAddr) {
        if(fromAddr === undefined){
            return from;
        }
        from = fromAddr;
        return this;
    };

    this.text = function (textMessage) {
        if(textMessage === undefined){
            return text;
        }
        text = textMessage;
        return this;
    };

    this.toJSON = function () {
        return JSON.stringify({
            text: text,
            to: to,
            from: from
        });
    }

}
module.exports = Message;
