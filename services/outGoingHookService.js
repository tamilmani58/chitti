var userRepository = require("../repositories/userRepository");
var changeManagementService = require('../services/changeManagementService');
/*{ type: 'GROUPCHAT',
 id: '00002d11-0000-003d-0000-00000000f995',
 to: 'g:7356796833216454833',
 from: 'u:ws4hd4pq0cypdcdy',
 actor: '',
 text: 'hi',
 uid: '1474714428200-RPMME4-apollo-z4' } */
var receiveMessage = function (changeMessage, userId) {
    var changeList = changeMessage.split("\n");
    var user = userRepository.getUserByFlockId(userId).then(function (user) {
        changeManagementService.commit(changeList.map(function (change) {
            return {
                userAd: user.userAd(),
                message: change
            };
        }));
    });
};
var outGoingHookService = {
    receiveMessage: receiveMessage
};

module.exports = outGoingHookService;