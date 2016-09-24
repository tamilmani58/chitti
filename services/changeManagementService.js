/**
 * Created by pritam on 24/9/16.
 */
var Change = require('./models/change.js');
var changeCollection = require('.models/changeCollection.js');
var util = require('./util.js');
var botService = require('./services/botService.js');


var commit = function (commitChanges) {
    if (util.isArray(commitChanges) && commitChanges.length > 0) {
        commitChanges.forEach(function (changeObject) {
           changeCollection.add(new Change().state(Change.state.COMMIT).userAd(changeObject.userAd).message(changeObject.message));
        });
    }
};
var push = function (pushConfig) {
    if (pushConfig.hasOwnProperty(user_email) && pushConfig.hasOwnProperty(user_name)) {
        var adUserName = pushConfig.adName;
        var pushChangesByUser = changeManagementService.filterByUserAd(adUserName);
        if (util.isArray(pushChangesByUser) && pushChangesByUser.length > 0) {
            pushChangesByUser.forEach(function (pushChange) {
               pushChange.state(Change.State.PUSH);
            });

        }
        botService.sendPushNotification(pushConfig);
    }
};

var live = function (liveConfig) {
    var userName = liveConfig.user_name;
    var changesInPushState = changeManagementService.filterByState(Change.State.BUILD_SUCCESS);
    if (util.isArray(changesInPushState) && changesInPushState.length > 0) {
        changesInPushState.forEach(function (pushChange) {
            pushChange.state(Change.State.LIVE);
        });
    }
    botService.sendLiveNotification(liveConfig);
}


var changeManagementService = {
    commit: commit,
    push:  push,
    live:  live
};

module.exports = changeManagementService;

