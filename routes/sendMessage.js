var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var TWILIO_TOKEN = "270ff32fe16828869dc30e0c6926fa9e";
var TWILIO_ACCOUNT_SID = "AC55a59221acb23a5aa6f046740bb73317";
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', function(req, res) {
    console.log('this is the req', req.body);
    var TWILIO_NUMBER = '+17633249718';
    var CELL_NUMBER = '+19522209630';
    client.messages.create({
        to:process.env.TWILIO_NUMBER,
        from:process.env.CELL_NUMBER,
        body:'hello World'
    }, function(err, data) {
        if (err) {
            console.log('err', err);
            console.log('data', data);
        }
    });//en d of sendMessage
    res.send(200);
});

module.exports = router;
