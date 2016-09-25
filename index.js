/**
 * Created by tamil on 24/9/16.
 */
var express = require('express');
var gitResponseParser = require('./git-response-parser.js');
var app = express();
var util = require('./util.js');
var path = require('path');

var flock = require('flockos');
var bodyParser = require('body-parser');
var config = require('./config/appconfig.js');
var outGoingHookService = require('./services/outGoingHookService.js');
var changeManagementService = require('./services/changeManagementService.js');
var buildManagementService = require('./services/buildManagementService.js');
var slashCommandService = require('./services/slashCommandService.js');
var outGoingHookService = require('./services/outGoingHookService.js');
var app = express();

flock.setAppId(config.APP_ID);
flock.setAppSecret(config.APP_SECRET);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(flock.validationTokenChecker);



app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function (req, res) {
    res.send("done");
});
app.post('/new', function (req, res) {
    var changeMessage = req.body.data;
    var params = JSON.parse(req.body.params);
    outGoingHookService.receiveMessage(changeMessage, params.userId);
    res.sendStatus(200);
    res.end();
});
app.post('/events', flock.router);

app.post('/pushbuild', buildManagementService.stageBuild);
app.post('/stagebuild', buildManagementService.stageBuild);
app.post('/livebuild', buildManagementService.liveBuild);

app.get('/widget', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/widget.html'));
});
app.post('/push', function (req, res) {
    var parsedGitResponse = gitResponseParser.parseGitResponseObject(req.body);
    if (!(gitResponseParser.isPushToMaster(parsedGitResponse.branchName) || gitResponseParser.isPushToRelease(parsedGitResponse.branchName))) {
        return res.end();
    }
    if (gitResponseParser.isPushToMaster(parsedGitResponse.branchName)) {
        changeManagementService.push(parsedGitResponse);
    } else {
        changeManagementService.live(parsedGitResponse);
    }
    res.send('response sent');

});

flock.events.on('client.recieve', function (event) {
    return {
        text: 'Got: ' + event.text
    }
});

flock.events.on('client.slashCommand', function (event) {
   return slashCommandService.processSlashEvent(event);
});

app.listen(1432, function () {
    console.log('Example app listening on port 1432!');
});
