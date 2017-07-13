var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongo = require('./mongo');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', function(req, res) {
  console.log('in register post:', req.body);
  bcrypt.genSalt(12, function(err, salt) {
    if (err) {
      console.log('salt err:', err);
      res.sendStatus(400);
    } else {
      console.log('salt:', salt);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          console.log('hash err:', err);
          res.sendStatus(400);
        } else {
          console.log('hash:', hash);
          // only save hashed password
          var newUser = {
              firstName:req.body.firstName,
              lastName: req.body.lastName,
              email:req.body.email,
              zipcode: req.body.zipcode,
              password: hash,
              state:req.body.state,
              city:req.body.city,
              phone:req.body.phone,
              image:req.body.image
          };
          console.log('saving user:', newUser);
          // save newUser to db
          // exporting model from mongo
          mongo(newUser).save();
          res.send(newUser);
        }
      });
    }
  });
});





module.exports = router;
