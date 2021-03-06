function Change() {
    var state = "COMMIT";

    var userAd;
    var message;

    this.state = function (update) {
        if (update === undefined) {
            return state;
        }
        state = update;
        return this;
    };

    this.userAd = function (user) {
        if (user === undefined) {
            return userAd;
        }
        userAd = user;
        return this;
    };

    this.message = function (messageTxt) {
        if (messageTxt === undefined) {
            return message;
        }
        message = messageTxt;
        return this;
    };
    this.toString = function () {
        return JSON.stringify({
           state : state,
            message: message,
            userAd : userAd
        });
    };
}
Change.State = {};
Change.State.COMMIT = 'commit';
Change.State.STAGE = 'stage';
Change.State.STAGE_BUILD = 'stageBuild';
Change.State.LIVE = 'live';
Change.State.LIVE_SUCCESS = 'liveBuild';
module.exports = Change;