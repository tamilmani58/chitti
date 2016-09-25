function User() {
    var userToken;
    var userId;
    var email;
    var userAd;

    this.userToken = function (userTokenVal) {
        if(userTokenVal === undefined){
            return userToken;
        }
        userToken = userTokenVal;
        return this;
    };

    this.userId = function (userIdVal) {
        if(userIdVal === undefined){
            return userId;
        }
        userId = userIdVal;
        return this;
    };

    this.userAd = function (user) {
        if(user === undefined){
            return userAd;
        }
        userAd = user;
        return this;
    };

    this.email = function (emailId) {
        if(emailId === undefined){
            return email;
        }
        email = emailId;
        return this;
    }

}
module.exports = User;