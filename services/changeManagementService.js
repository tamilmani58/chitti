/**
 * Created by pritam on 24/9/16.
 */
var Change = require('../models/change.js');
var changeCollection = require('../collections/changeCollection.js');
var util = require('../util.js');
var botService = require('../services/botService.js');
var stateManagementService = require('../services/stateManagementService.js');


var commit = function (commitChanges) {
    stateManagementService.currentStatus(Change.State.COMMIT);
    if (util.isArray(commitChanges) && commitChanges.length > 0) {
        commitChanges.forEach(function (changeObject) {
            changeCollection.add(new Change().state(Change.State.COMMIT).userAd(changeObject.userAd).message(changeObject.message));
        });
    }
    console.log("commit");
    changeCollection.all();
};

var push = function (pushConfig) {
    stateManagementService.currentStatus(Change.State.STAGE);
    if (pushConfig.hasOwnProperty('emailId') && pushConfig.hasOwnProperty('name')) {
        return;
    }
    var adUserName = pushConfig.adName;
    var pushChangesByUser = changeCollection.filterByUserAd(adUserName);
    if (util.isArray(pushChangesByUser) && pushChangesByUser.length > 0) {
        pushChangesByUser.forEach(function (pushChange) {
            pushChange.state(Change.State.STAGE);
        });

    }
    console.log("push to stage");
    changeCollection.all();
};

var live = function (liveConfig) {
    stateManagementService.currentStatus(Change.State.LIVE);
    var userName = liveConfig.name;
    var changesInPushState = changeCollection.filterByState(Change.State.STAGE_BUILD);
    if (util.isArray(changesInPushState) && changesInPushState.length > 0) {
        changesInPushState.forEach(function (pushChange) {
            pushChange.state(Change.State.LIVE);
        });
    }
    console.log("push to live");
    changeCollection.all();
};

var changeManagementService = {
    commit: commit,
    push: push,
    live: live
};

module.exports = changeManagementService;

