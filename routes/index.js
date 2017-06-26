var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');

//uses
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    console.log('Base url hit');
    res.sendFile(path.resolve('public/views/index.html'));
});// end Base url get


module.exports = router;
