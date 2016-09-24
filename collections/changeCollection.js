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
    }
}
module.exports = ChangeCollection;