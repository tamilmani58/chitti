/**
 * Created by tamil on 24/9/16.
 */
var express = require('express');
var flock = require('flockos');
var bodyParser = require('body-parser');

var app = express();

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

app.post('/events', flock.router);

flock.events.on('client.recieve', function (event) {
    return {
        text: 'Got: ' + event.text
    }
});

app.listen(1432, function () {
    console.log('Example app listening on port 3000!');
});
