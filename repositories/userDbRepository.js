var userLog = require('../dbmodels/UserDb');
function userDbRepository() {
    this.createUser = function(user){
        userLog.create(user);
    };
    this.getUserByAd = function (userAd) {
        return userLog.findOne({
            where: {
                userAd: userAd
            }
        });
    }

    this.getUserByFlockId = function (flockId) {
        return userLog.findOne({
            where:{
                userId: flockId
            }
        })
    }
}

module.exports = new userDbRepository();