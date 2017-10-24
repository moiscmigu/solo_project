var mongoose = require ('mongoose');



mongoose.connect("mongodb://heroku_09wjnwq1:bvnvj00llce5c8j1oe1psjd3hi@ds161640.mlab.com:61640/heroku_09wjnwq1");



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
