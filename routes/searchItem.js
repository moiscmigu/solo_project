var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoItem = require('./itemDB');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.get('/:item', function(req, res) {
    console.log('/searchItem url hit');
    var dataFromClient = req.params.item;
    console.log(dataFromClient);
    mongoItem.find({'itemName' : new RegExp(dataFromClient, 'i')}, function(err, item) {
        if (err) {
            console.log('err', err);
            res.send(500);
        }
        else {

            res.send(item);
        }
    });

});

module.exports = router;
