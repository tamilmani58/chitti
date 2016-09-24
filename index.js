/**
 * Created by tamil on 24/9/16.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(1432, function () {
    console.log('Example app listening on port 3000!');
});