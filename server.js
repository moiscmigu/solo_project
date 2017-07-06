var express = require('express');
var app = express();
var bodyParser =require('body-parser');
var port = process.env.PORT || 7138;
var index = require('./routes/index');
var register = require('./routes/register');
var logIn = require('./routes/login');
var newItem = require('./routes/newItem.js');
//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', index);
app.use('/register', register);
app.use('/login', logIn);
app.use('/newItem', newItem);


app.listen(port, function() {
    console.log('Server up on port:', port);
});//end listen
