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

router.delete('/:id', function(req, res) {
    console.log('delete url hit', req.params.id);
    var id = req.params.id;

    mongoItem.remove({ _id: id}, function(err) {
    if (!err) {
            res.send('deleted item');
            

    }
    else {
        console.log('err', err);
            res.send(500);
    }
});




});//end of delete

module.exports = router;
