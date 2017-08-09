var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var config = require('config.json')('./sample.json');
// var TWILIO_TOKEN = "270ff32fe16828869dc30e0c6926fa9e";
// var TWILIO_ACCOUNT_SID = "AC55a59221acb23a5aa6f046740bb73317";

var twilio = require('twilio');
var client = new twilio(config.twilio.twil_sid, config.twilio.twil_token);

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', function(req, res) {
    console.log('send to this phone', req.body.to);
    console.log('send this message', req.body.body);

    client.messages.create({
        to:'9522209630',
        from:'7633249718',
        body:req.body.body
    }, function(err, data) {
        if (err) {
            console.log('err', err);
            console.log('data', data);
        }
    });//en d of sendMessage
    res.send(200);
});




module.exports = router;
