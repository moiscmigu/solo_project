require('dotenv').config({
    path:"./.env"
});

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var twilio= require('twilio');
var client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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
