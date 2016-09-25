var userData = require("../data/data.js");
var User = require("../models/user");
var userDB = require("../dbmodels/user");
var userService = require("../services/UserService");
var userDbRepository = require("../repositories/userDbRepository");
function UserRepository() {
    var users = [];
    this.getUserByFlockId = function (flockId) {
        return userDbRepository.getUserByFlockId(flockId).then(function (response) {
            var userDbObj = response.dataValues;
            return new User().userAd(userDbObj.userAd).email(userDbObj.email).flockId(userDbObj.userId).userToken(userDbObj.userToken);
        });
    };

    this.getUserByAd = function (userAd) {
        return userDbRepository.getUserByAd(userAd).then(function (response) {
            var userDbObj = response.dataValues;
            return new User().userAd(userDbObj.userAd).email(userDbObj.email).flockId(userDbObj.userId).userToken(userDbObj.userToken);
        });
    };

    this.setUserData = function (userData) {
        return userService.getEmailByUserId(userData.userToken).then(function (response) {
            userDbRepository.createUser({
               userId: response.id,
                email: response.email,
                userAd: response.email.split("@")[0],
                userToken: userData.userToken
            });
            return "Done";
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