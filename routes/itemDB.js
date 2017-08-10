var mongoose = require ('mongoose');



mongoose.connect("mongodb://heroku_p2n5vtds:uuma40pb6rpu2iun9hggo6c5u1@ds113000.mlab.com:13000/heroku_p2n5vtds");



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
