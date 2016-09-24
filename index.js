/**
 * Created by tamil on 24/9/16.
 */
var express = require('express');
var gitResponseParser = require('./git-response-parser.js');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function (req, res) {
    console.log(req.body);
    res.send("done");
});

app.post('/push', function (req, res) {
    console.log(req.body);
    if (gitResponseParser.isPushToMaster(req.body) || gitResponseParser.isPushToRelease(req.body)) {
        var parsedGitResponse = gitResponseParser.parseGitResponseObject(req.body);
        console.log(parsedGitResponse);
        res.send('response sent');
    } else {
        console.log('not pushed to branch master or release');
    }
    //gitResponseParser.parseCommits(res.body.commits);
});

app.listen(1432, function () {
    console.log('Example app listening on port 1432!');
});
