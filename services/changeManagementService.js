/**
 * Created by pritam on 24/9/16.
 */
var Change = require('../models/change.js');
var changeCollection = require('../collections/changeCollection.js');
var util = require('../util.js');
var botService = require('../services/botService.js');


var commit = function (commitChanges) {
    if (util.isArray(commitChanges) && commitChanges.length > 0) {
        commitChanges.forEach(function (changeObject) {
           changeCollection.add(new Change().state(Change.State.COMMIT).userAd(changeObject.userAd).message(changeObject.message));
        });
    }
};
var push = function (pushConfig) {
    console.log('am i there', pushConfig);
    if (pushConfig.hasOwnProperty('emailId') && pushConfig.hasOwnProperty('name')) {
        var adUserName = pushConfig.adName;
        var pushChangesByUser = changeCollection.filterByUserAd(adUserName);
        if (util.isArray(pushChangesByUser) && pushChangesByUser.length > 0) {
            pushChangesByUser.forEach(function (pushChange) {
               pushChange.state(Change.State.STAGE);
            });

        }
        console.log('in cms', pushConfig);
        botService.sendPushNotification(pushConfig);
    }
};

var live = function (liveConfig) {
    var userName = liveConfig.name;
    var changesInPushState = changeCollection.filterByState(Change.State.BUILD_SUCCESS);
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

