var express = require('express');
var app = express();
var bodyParser =require('body-parser');
var port = process.env.PORT || 7138;
var index = require('./routes/index');
var register = require('./routes/register');
var logIn = require('./routes/login');
var newItem = require('./routes/newItem.js');
var searchItem = require('./routes/searchItem');
var sendMessage = require('./routes/sendMessage');
var sendEmailMessage = require('./routes/sendEmailMessage');
//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', index);
app.use('/register', register);
app.use('/login', logIn);
app.use('/newItem', newItem);
app.use('/searchItem', searchItem);
app.use('/sendMessage', sendMessage);
app.use('/sendEmailMessage', sendEmailMessage);


app.listen(port, function() {
    console.log('Server up on port:');

});//end listen
