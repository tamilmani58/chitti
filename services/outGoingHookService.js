var userRepository = require("../repositories/userRepository");
var changeManagementService = require('../services/changeManagementService');
/*{ type: 'GROUPCHAT',
 id: '00002d11-0000-003d-0000-00000000f995',
 to: 'g:7356796833216454833',
 from: 'u:ws4hd4pq0cypdcdy',
 actor: '',
 text: 'hi',
 uid: '1474714428200-RPMME4-apollo-z4' } */
function receiveMessage(req, res){
    console.log(req.body);
    var changeMessage = req.body;
    var changeList = changeMessage.text.split("\n");
    var user = userRepository.getUserByFlockId(changeMessage.from);
    console.log(user);
    changeManagementService.commit(changeList.map(function (change) {
        return {
            userAd: user.userAd(),
            message: change
        };
    }));
    res.send("Got the Message");
}

module.exports = receiveMessage;