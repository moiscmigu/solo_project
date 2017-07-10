var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', function(req, res) {
    console.log('this is the req', req.body);

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'moisesmigueledu@gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'moisesmigueledu@gmail.com',
            pass: 'Vd7510qqq'
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: req.from, // sender address
        to: req.to, // list of receivers
        subject: 'Hello world', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.send(200);
});

module.exports = router;
