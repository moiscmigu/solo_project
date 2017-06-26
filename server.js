var express = require('express');
var app = express();
var bodyParser =require('body-parser');
var port = process.env.PORT || 7138;
var index = require('./routes/index');


//uses
app.use(express.static('public'));
app.use('/', index);


app.listen(port, function() {
    console.log('Server up on port:', port);
});//end listen
