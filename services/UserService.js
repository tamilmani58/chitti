var config = require("../config/appconfig");
var request = require("request");
var when = require("when");
function UserService() {
    this.getEmailByUserId = function (userToken) {
        var defered = when.defer();
        var options = {
            "url" : config.FLOCK_GET_USER_INFO_URL,
            "headers": {
                "X-Flock-User-Token" : userToken
            },
            "method": 'POST'
        };
        console.log(options);
        request(options, function (err, response) {
            if (!err) {
                return defered.resolve(JSON.parse(response.body));
            }
        });
        return defered.promise;
    };
}
module.exports = new UserService();