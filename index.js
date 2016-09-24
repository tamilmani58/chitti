/**
 * Created by tamil on 24/9/16.
 */
var express = require('express');
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

app.listen(1432, function () {
    console.log('Example app listening on port 3000!');
});
