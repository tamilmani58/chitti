var userRepository = require("../repositories/userRepository");
function receiveMessage(req, res){
    console.log(req.body);

    res.send("Got the Message");
}

module.exports = receiveMessage;