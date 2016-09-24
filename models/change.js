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
            return user;
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
}
Change.State = {};
Change.State.COMMIT = 'commit';
Change.State.PUSH = 'push';
Change.State.BUILD_SUCCESS = 'buildSuccess';
Change.State.LIVE = 'live';
Change.State.LIVE_SUCCESS = 'liveSuccess';
module.exports = Change;