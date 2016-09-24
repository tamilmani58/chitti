/**
 * Created by tamil on 24/9/16.
 */
var express = require('express');
var gitResponseParser = require('./git-response-parser.js');
var app = express();

var flock = require('flockos');
var bodyParser = require('body-parser');
var config = require('./config/appconfig.js');
var outGoingHookService = require('./services/outGoingHookService.js');
var changeManagementService = require('./services/changeManagementService.js');
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
    console.log(req.body);
    res.send("done");
});
app.post('/hook', outGoingHookService);
app.post('/events', flock.router);
app.post('/build', function (req, res) {

});
app.post('/push', function (req, res) {
    if (gitResponseParser.isPushToMaster(req.body) || gitResponseParser.isPushToRelease(req.body)) {
        var parsedGitResponse = gitResponseParser.parseGitResponseObject(req.body);
        changeManagementService.push(parsedGitResponse);
        res.send('response sent');
    } else {
        console.log('not pushed to branch master or release');
    }
    //gitResponseParser.parseCommits(res.body.commits);
});
flock.events.on('client.recieve', function (event) {
    return {
        text: 'Got: ' + event.text
    }
});

app.listen(1432, function () {
    console.log('Example app listening on port 1432!');
});
