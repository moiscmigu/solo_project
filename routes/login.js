var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongo = require('./mongo');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', function(req, res) {
    console.log(req.body);
    mongo.findOne({
      email: req.body.email
    }, function(err, mongo) {
      if (err) {
        console.log('find mongo err', err);
        res.sendStatus(400);
      } else {
        //compares passwords
        if (mongo != undefined) {
          console.log('comparing: ', req.body.password, mongo.password);
          bcrypt.compare(req.body.password, mongo.password, function(err, isMatch) {
            if (err) {
              console.log('compare err', err);
              res.sendStatus(400);
            } else {
              console.log('found you');
            if (isMatch) {
                console.log('in match');
                res.send('Match!!!');
              } else {
                  console.log('in no match');
                res.send('no match');
              }
            }
          });
        } else {
          console.log('no user found');
          res.send(400);
        }
      }
    });
});





module.exports = router;
