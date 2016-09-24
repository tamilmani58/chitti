/**
 * Created by pritam on 24/9/16.
 */
var changeCollection = require('../collections/changeCollection.js');
var util = require('../util.js');
var Change = require('../models/change.js');
var botService = require('../services/botService');
var logService = require('../services/logService');
var stateManagementService = require('../services/stateManagementService.js');
var TYPE = {
    REVERT : 2,
    UPLOAD : 1,
    TEST : 0
};
var stageBuild = function (req, res) {
    console.log("stage build",req.body);
    var buildUser = req.body.culprits[0];
    var status = req.body.status;
    var buildStatus = status === 1 ? Change.State.STAGE_BUILD: Change.State.COMMIT;
    var adName = buildUser.split('@')[0];
    var buildChanges = changeCollection.filterByUserAd(adName);

    if (util.isArray(buildChanges) && buildChanges.length > 0) {
        buildChanges.forEach(function (buildChange) {
            buildChange.state(buildStatus);
        });
    }
    stateManagementService.currentStatus(buildStatus);
    changeCollection.all();
    if (status === 1) {
        botService.sendStageBuildSuccessNotification({
            adName: adName
        });
        return res.end();
    }
    botService.sendStageBuildFailNotification({
        adName: adName
    });
    return res.end();
};
var liveBuild = function (req, res) {
    var culprits = req.body.culprits;
    var status = req.body.status;
    var jenkinsRef = req.body.jenkinsRef ;
    var type = req.body.type || TYPE.UPLOAD;
    var liveStatus = status === 1 ? Change.State.LIVE_SUCCESS : Change.State.STAGE_BUILD;
    culprits.forEach(function (culprit) {
        var adName = culprit.split('@')[0];
        var liveChanges = changeCollection.filterByUserAd(adName);
        if (util.isArray(liveChanges) && liveChanges.length > 0) {
            liveChanges.forEach(function (liveChange) {
                liveChange.state(liveStatus);
            });
        }
    });
    stateManagementService.currentStatus(liveStatus);
    if (status === 1) {
        var changesCollection = changeCollection.sync();
        logService.addUploadLog(changesCollection, {
            jenkinsRef: jenkinsRef,
            type: type
        });
        changeCollection.clear();
        botService.sendLiveBuildSuccessNotification({
            adName: "All"
        });
        return res.end();
    }
    botService.sendLiveBuildFailNotification({

        adName: "All"
    });
};

var buildManagementService = {
    stageBuild: stageBuild,
    liveBuild: liveBuild
};
module.exports = buildManagementService;
