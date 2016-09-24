var userData = require("../data/data.js");
var User = require("../models/user")
function UserRepository() {
    var users = [];
    this.getUserByFlockId = function (flockId) {
        users.forEach(function (user) {
            if(user.flockId === flockId)
                return this;
        })
    };

    this.getUserByAd = function (userAd) {
      return users.find(function (user) {
        return user.userAd === userAd;
      });
    };

    function init() {
        userData.forEach(function (user) {
            users.push(new User().userAd(user.userAd).flockId(user.flockId).email(user.email));
        });

    }
    init();
}
module.exports = new UserRepository();