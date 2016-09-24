function User() {
    var userAd;
    var flockId;
    var email;

    this.userAd = function (user) {
        if(user === undefined){
            return userAd;
        }
        userAd = user;
        return this;
    };

    this.flockId = function (flock) {
        if(flock === undefined){
            return flockId;
        }
        flockId = flock;
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