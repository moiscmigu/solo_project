var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoItem = require('./itemDB');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', function(req, res){
    console.log('/newitem url hit');
    console.log('cheking to see what is wrong with rentDay', req.body.zipcode);
    var newUser = {
        itemName:req.body.itemName,
        rentDay: req.body.rentDay,
        rentWeek: req.body.rentWeek ,
        rentMonth:req.body.rentMonth,
        email: req.body.email,
        phone:req.body.phone,
        description: req.body.description,
        zipcode: req.body.zipcode,
        state:req.body.state,
        city:req.body.city,
        image:req.body.image
    };
    console.log('saving user:', newUser);
    // save newUser to db
    // exporting model from mongo
    mongoItem(newUser).save();
    res.send(newUser);
});//end post



router.get('/:data', function(req, res) {
    console.log('get url hit');
    console.log(req.params.data);
    mongoItem.find(req.params.data, function (err, person){
        if (err) {
            console.log('err', err);
            res.send(400);
        } else {
            console.log(person);
            res.send(person);
        }
    });
});//end get

module.exports = router;
