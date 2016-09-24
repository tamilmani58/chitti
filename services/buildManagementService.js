/**
 * Created by pritam on 24/9/16.
 */
var changeCollection = require('../collections/changeCollection.js');
var util = require('../util.js');
var Change = require('../models/change.js');
var pushBuild = function (req, res) {
  var culprits = req.body.culprits;
    var status = req.body.status;
    var buildStatus = status === 1 ? Change.State.PUSH_SUCCESS: Change.State.COMMIT;
    culprits.forEach(function (culprit) {
        var adName = culprit.split('@')[0];
        var buildChanges = changeCollection.filterByUserAd(adName);
        if (util.isArray(buildChanges) && buildChanges.length > 0) {
            buildChanges.forEach(function (buildChange) {
                buildChange.state(buildStatus);
            });
        }
        console.log('add bot Service code');


    });
};
var liveBuild = function (req, res) {
    var culprits = req.body.culprits;
    var status = req.body.status;
    var liveStatus = status === 1 ? Change.State.LIVE_SUCCESS : Change.State.PUSH_SUCCESS;
    culprits.forEach(function (culprit) {
        var adName = culprit.split('@')[0];
        var liveChanges = changeCollection.filterByUserAd(adName);
        if (util.isArray(liveChanges) && liveChanges.length > 0) {
            liveChanges.forEach(function (liveChange) {
                liveChange.state(liveStatus);
            });
        }
        console.log('add bot Service code');


    });
};

var buildManagementService = {
    pushBuild: pushBuild,
    liveBuild: liveBuild
};
module.exports = buildManagementService;
