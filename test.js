var Message = require("./models/message");
var request = require("request");
var pushMessage = {
    "user_name": "Tamil Selvan",
    "user_email": "tamil.s@directi.com",
    "total_commits_count" :1
};
var sendMessageCallback = function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        //push stage
        pushMessage.ref = "refs/heads/master";
        var options = {
            "url": "http://2b77282c.ngrok.io/push",
            "headers":{
                "content-type" : "application/json"
            }
        }
        options.body = JSON.stringify(pushMessage);
        options.method = 'POST';
        request(options, jenkinStageCallback);


    } else{
        console.log(error);
    }
};
var options = {};
var message = {
    type: 'GROUPCHAT',
    id: '00002d11-0000-003d-0000-00000000f995',
    to: 'g:7356796833216454833',
    from: 'u:4llt4rm20lcleer2',
    actor: '',
    text: 'My changes: Bug fix\n  second change',
    uid: '1474714428200-RPMME4-apollo-z4'
};
options.headers = {
    "content-type" : "application/json"
};
options.url = "http://2b77282c.ngrok.io/hook";
options.body = JSON.stringify(message);
options.method = 'POST';
request(options, sendMessageCallback);

function jenkinStageCallback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var pushMessage = {
            "culprits": ["tamil.s@directi.com"],
            "status": 1,
            "jenkinsRef" : "http://ci.media.net"
        };
        var options = {
            "url": "http://2b77282c.ngrok.io/pushbuild",
            "headers":{
                "content-type" : "application/json"
            }
        };
        options.body = JSON.stringify(pushMessage);
        options.method = 'POST';
        request(options, livepushcallback);

    } else{
        console.log(error);
    }
}

function livepushcallback(error, response, body) {
    if (!error && response.statusCode == 200) {
        pushMessage.ref = "refs/heads/release";
        var options = {
            "url": "http://2b77282c.ngrok.io/push",
            "headers":{
                "content-type" : "application/json"
            }
        };
        options.body = JSON.stringify(pushMessage);
        options.method = 'POST';
        request(options, jenkinliveCallback);
    } else{
        console.log(error);
    }
}

function jenkinliveCallback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var pushMessage = {
            "culprits": ["tamil.s@directi.com"],
            "status": 1,
            "jenkinsRef" : "http://ci.media.net"
        };
        var options = {
            "url": "http://2b77282c.ngrok.io/livebuild",
            "headers":{
                "content-type" : "application/json"
            }
        };
        options.body = JSON.stringify(pushMessage);
        options.method = 'POST';
        request(options, function () {});

    } else{
        console.log(error);
    }
}