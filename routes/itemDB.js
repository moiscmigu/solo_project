var mongoose = require ('mongoose');



mongoose.connect("mongodb://heroku_ts08t06v:9q4c5or12a5c8c3oidb54j0rft@ds117839.mlab.com:17839/heroku_ts08t06v");



var itemSchema = new mongoose.Schema({
    itemName:String,
    rentDay: Number,
    rentWeek: Number,
    rentMonth:Number,
    email: String,
    phone: Number,
    description: String,
    zipcode:Number,
    state:String,
    city:String,
    image:String
});

var itemModel = mongoose.model('itemModel', itemSchema);

module.exports = itemModel;
