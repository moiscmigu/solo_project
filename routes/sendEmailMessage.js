var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

router.post('/', function(req, res) {
    nodemailer({
    from: "moisesmigueledu@gmail.com", // sender address
    to: "moisesmigueledu@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
    });
});


module.exports = router;
