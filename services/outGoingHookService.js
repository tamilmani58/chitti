function receiveMessage(req, res){
    console.log(req.body);
    res.send("Got the message");
}

module.exports = receiveMessage;