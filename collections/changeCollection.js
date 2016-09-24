var Change = require("../models/change");
function ChangeCollection() {
    var changes = [];
    this.add = function (change) {
        changes.push(change);
    };

    this.filterByUserAd = function (userAd) {
        return changes.filter(function (change) {
            return change.userAd() === userAd;
        })
    };

    this.filterByState = function (state) {
        return changes.filter(function (change) {
            return change.state() === state;
        })
    };

    this.sync = function () {
        console.log("Change log: " + this.filterByState(Change.State.LIVE_SUCCESS));
    };

    this.all = function () {
        changes.forEach(function (change) {
            console.log(change.toString())
        });
    };

    this.clear = function () {
        changes = changes.filter(function (change) {
           return change.state() !== Change.State.LIVE_SUCCESS;
        });
    };
}
module.exports = new ChangeCollection();